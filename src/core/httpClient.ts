import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, authenticate, shouldRetry401, AuthConfig } from './authManager';
import { logError } from './errorHandler';
import { getApiUrl } from './envConfig';

export interface HttpRequestParams {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    params?: any;
    data?: any;
    config?: AxiosRequestConfig;
    authConfig: AuthConfig;
}

export async function request<T = any>({
    url,
    method = 'GET',
    params = null,
    data = null,
    config = {},
    authConfig
}: HttpRequestParams): Promise<T> {
    let token = await getToken(authConfig);

    const sendRequest = async (): Promise<T> => {
        try {
            const headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const axiosConfig: AxiosRequestConfig = {
                method,
                url: getApiUrl() + url,
                params,
                data,
                headers,
                ...config
            };

            const response: AxiosResponse<any> = await axios(axiosConfig);
            const apiResponse = response.data;

            // Validasi struktur dan success flag
            if (!apiResponse.status) {
                throw {
                    req_id: apiResponse.req_id || null,
                    srv_id: apiResponse.srv_id || null,
                    status: false,
                    code: apiResponse.code || response.status,
                    content: apiResponse.content || null,
                    errors: apiResponse.errors || null,
                    message: apiResponse.message || 'Unknown API error'
                };
            }

            return apiResponse as T;
        } catch (error: any) {
            logError(error);

            if (error.response?.status === 401 && shouldRetry401()) {
                console.warn('[httpClient] 401 Unauthorized. Retrying authentication...');
                token = await authenticate(authConfig);
                return sendRequest();
            }

            const errorResponse = error.response?.data || {};

            throw {
                req_id: errorResponse.req_id || null,
                srv_id: errorResponse.srv_id || null,
                status: false,
                code: errorResponse.code || error.response?.status || 500,
                content: null,
                errors: errorResponse.errors || null,
                message:
                    errorResponse.message ||
                    error.message ||
                    'No response received or unknown error.'
            };
        }
    };

    return sendRequest();
}
