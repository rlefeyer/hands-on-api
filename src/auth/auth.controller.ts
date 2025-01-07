import {Controller, Get, UseGuards, Request, Post, HttpStatus, Body, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from "./auth.guard";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {User} from "../users/entities/user.entity";
import {Public} from "./public.decorator";
import {AuthUserDto} from "./dto/auth-user.dto";
import {AuthService} from "./auth.service";

@Controller('v1/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get('profile')
    getProfile(@Request() req:any) {
        return req.user;
    }

    @Post()
    @ApiOperation({ summary: 'Authentifier l\'utilisateur' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Session.', type: User })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur serveur interne' })
    @Public()
    async auth(@Body() authUserDto: AuthUserDto): Promise<{access_token:string}> {

        const user = await this.authService.login(authUserDto);
        if (!user) throw new UnauthorizedException();
        return user;
    }


}
