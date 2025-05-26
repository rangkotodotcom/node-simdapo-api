import Joi from 'joi';
import { request } from '../core/httpClient';
import { validate, ValidationResult } from '../core/validator';
import { AuthConfig } from '../core/authManager';


export async function getUser(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/student/${id}` : '/student';

    return await request({
        url,
        authConfig
    });
}

interface UserPayload {
    name: string;
    age?: number;
}

const userSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().min(0).optional()
});

export async function createUser(
    data: unknown,
    authConfig: AuthConfig
): Promise<any | ValidationResult<null>> {
    const validation = validate<UserPayload>(userSchema, data);
    if (!validation.status) return validation;

    return await request({
        url: '/user',
        method: 'POST',
        data: validation.content,
        authConfig
    });
}
