import {Controller, Get, UseGuards, Request, Post, Body} from '@nestjs/common';
import {AuthGuard} from "./auth.guards";
import {User} from "../user/entities/user.entity";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: {user: User}) {
        return req.user;
    }

    @Post('login')
    async login(@Body() body: {name: string, password: string}) {
        return this.authService.signIn(body.name, body.password);
    }
}
