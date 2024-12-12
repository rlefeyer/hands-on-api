import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { User as UserDecorator } from './user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authentifier un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur authentifié avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Identifiants invalides',
  })
  signIn(@Body() loginDto: LoginUserDto) {
    return this.authService.signIn(loginDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtenir le profil utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Profil récupéré avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé',
  })
  getProfile(@UserDecorator() user: any) {
    return user;
  }
}
