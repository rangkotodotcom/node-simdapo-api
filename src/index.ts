import { authenticate, AuthConfig } from './core/authManager';
import * as schoolService from './services/schoolService';
import * as serverService from './services/serverService';
import * as componentService from './services/componentService';
import * as userService from './services/userService';
import * as teacherService from './services/teacherService';
import * as studentService from './services/studentService';

export async function init(config: AuthConfig) {
    await authenticate(config);

    return {
        getSchool: () => schoolService.getSchool(config),
        getServerTime: () => serverService.getTime(config),
        getServerStatus: () => serverService.getStatus(config),
        getComponentReligion: (id?: string) => componentService.getReligion(config, id),
        getComponentParentJob: (id?: string) => componentService.getParentJob(config, id),
        getComponentClassType: (id?: string) => componentService.getClassType(config, id),
        getComponentCurriculum: (id?: string) => componentService.getCurriculum(config, id),
        getComponentCurriculumSubjectType: (id?: string) => componentService.getCurriculumSubjectType(config, id),
        getComponentLevelEducation: (id?: string) => componentService.getLevelEducation(config, id),
        getComponentOfficialdomStatus: (id?: string) => componentService.getOfficialdomStatus(config, id),
        getComponentRegistrationType: (id?: string) => componentService.getRegistrationType(config, id),
        getComponentSubject: (id?: string) => componentService.getSubject(config, id),
        getComponentTeacherType: (id?: string) => componentService.getTeacherType(config, id),
        getComponentMajor: (id?: string) => componentService.getMajor(config, id),
        getUser: (id?: string) => userService.getUser(config, id),
        createUser: (data: unknown) => userService.createUser(data, config),
        getTeacher: (id?: string) => teacherService.getTeacher(config, id),
        getStudent: (params: unknown) => studentService.getStudent(params, config),
    };
}
