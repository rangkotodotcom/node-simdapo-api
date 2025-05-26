import { request } from '../core/httpClient';
import { AuthConfig } from '../core/authManager';

export async function getSchool(
    authConfig: AuthConfig,
): Promise<any> {
    const url = '/school';

    return await request({
        url,
        authConfig
    });
}
