import Joi from 'joi';
import { request } from '../core/httpClient';
import { validate, ValidationResult } from '../core/validator';
import { AuthConfig } from '../core/authManager';

interface GetStudentPayload {
    level_education?: string;
}

const getStudentSchema = Joi.object({
    level_education: Joi.string().optional()
});

export async function getStudent(
    params: unknown,
    authConfig: AuthConfig
): Promise<any | ValidationResult<null>> {
    const validation = validate<GetStudentPayload>(getStudentSchema, params);
    if (!validation.status) throw validation;

    return await request({
        url: '/student',
        params: validation.content,
        authConfig
    });
}
