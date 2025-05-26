import { request } from '../core/httpClient';
import { AuthConfig } from '../core/authManager';

export async function getReligion(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/component/religion/${id}` : '/component/religion';

    return await request({
        url,
        authConfig
    });
}

export async function getParentJob(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/component/parent-job/${id}` : '/component/parent-job';

    return await request({
        url,
        authConfig
    });
}

export async function getTeacherType(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/component/teacher-type/${id}` : '/component/teacher-type';

    return await request({
        url,
        authConfig
    });
}

export async function getOfficialdomStatus(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/component/officialdom-status/${id}` : '/component/officialdom-status';

    return await request({
        url,
        authConfig
    });
}

export async function getClassType(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/component/class-type/${id}` : '/component/class-type';

    return await request({
        url,
        authConfig
    });
}

export async function getLevelEducation(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/component/level-education/${id}` : '/component/level-education';

    return await request({
        url,
        authConfig
    });
}

export async function getCurriculum(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/component/curriculum/${id}` : '/component/curriculum';

    return await request({
        url,
        authConfig
    });
}

export async function getCurriculumSubjectType(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/component/curriculum-subject-type/${id}` : '/component/curriculum-subject-type';

    return await request({
        url,
        authConfig
    });
}

export async function getMajor(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/component/major/${id}` : '/component/major';

    return await request({
        url,
        authConfig
    });
}

export async function getRegistrationType(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/component/registration-type/${id}` : '/component/registration-type';

    return await request({
        url,
        authConfig
    });
}

export async function getSubject(
    authConfig: AuthConfig,
    id?: string
): Promise<any> {
    const url = id ? `/component/subject/${id}` : '/component/subject';

    return await request({
        url,
        authConfig
    });
}