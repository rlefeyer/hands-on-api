import { SetMetadata } from '@nestjs/common';
import {Role} from "./role.enum";

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';
export const Public = (...roles: Role[]) => SetMetadata(IS_PUBLIC_KEY, true);
export const Admin = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);