import Joi, { Schema } from 'joi';

export interface ValidationResult<T> {
    status: boolean;
    content?: T;
    error?: any;
    code: number;
    message: string;
}

export function validate<T>(schema: Schema, input: unknown): ValidationResult<T> {
    const { error, value } = schema.validate(input);

    if (error) {
        return {
            status: false,
            code: 422,
            error: error.details,
            message: error.details[0]?.message || 'Validation failed'
        };
    }

    return {
        status: true,
        code: 200,
        content: value as T,
        message: 'Validation passed'
    };
}
