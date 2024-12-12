import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "./auth.guards";
import {User} from "../user/entities/user.entity";
import {AuthService} from "./auth.service";
import {Roles} from "../user/roles.decorator";
import {Role} from "../user/entities/role.enum";
import {ThrottlerGuard} from "@nestjs/throttler";

@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req: { user: User }) {
        return req.user;
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Post("login")
    async login(@Body() body: { name: string, password: string }) {
        return this.authService.signIn(body.name, body.password);
    }
}
