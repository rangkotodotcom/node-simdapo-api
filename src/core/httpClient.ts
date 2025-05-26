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

            const response: AxiosResponse<T> = await axios(axiosConfig);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401 && shouldRetry401()) {
                console.warn('[httpClient] 401 Unauthorized. Retrying authentication...');
                token = await authenticate(authConfig);
                return sendRequest();
            }

            logError(error);
            throw error;
        }
    };

    return sendRequest();
}
