import { request } from '../core/httpClient';
import { AuthConfig } from '../core/authManager';

export async function getSemester(
    authConfig: AuthConfig,
): Promise<any> {
    const url = '/semester';

    return await request({
        url,
        authConfig
    });
}
