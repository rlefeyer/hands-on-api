import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Role} from "./entities/role.enum";
import {ROLES_KEY} from "./roles.decorator";

@Injectable()
export class RoleGuards implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]);
        if (!requiredRoles) return true;
        const {user} = context.switchToHttp().getRequest();
        console.log(user);
        //if (!user) return false;
        return requiredRoles.some((role) => user.role === role);
    }
}