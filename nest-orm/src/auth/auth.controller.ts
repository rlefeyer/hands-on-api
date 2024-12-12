import {Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {Public} from './constant.guard';
import {Role} from "./role.enum";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public(Role.User)
    signIn(@Body() signInDto: Record<string, any>) {
        console.log("ici")
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
