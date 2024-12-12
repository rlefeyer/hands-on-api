import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return AuthService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
