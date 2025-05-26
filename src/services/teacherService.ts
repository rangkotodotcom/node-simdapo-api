import { request } from '../core/httpClient';
import { AuthConfig } from '../core/authManager';

export async function getTeacher(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/teacher/${id}` : '/teacher';

    return await request({
        url,
        authConfig
    });
}
