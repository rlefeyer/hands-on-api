import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {APP_GUARD} from "@nestjs/core";
import {RoleGuards} from "./role.guards";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: APP_GUARD,
            useClass: RoleGuards,
        },
    ],
    exports: [UserService],
})
export class UserModule {
}