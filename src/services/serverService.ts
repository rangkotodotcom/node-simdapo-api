import { request } from '../core/httpClient';
import { AuthConfig } from '../core/authManager';

export async function getTime(
    authConfig: AuthConfig,
): Promise<any> {
    const url = '/server/time';

    return await request({
        url,
        authConfig
    });
}

export async function getStatus(
    authConfig: AuthConfig,
): Promise<any> {
    const url = '/server/status';

    return await request({
        url,
        authConfig
    });
}
