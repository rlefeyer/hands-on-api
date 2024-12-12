import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { UserDecorator } from './decorators/user.decorator';
import { Role } from './enums/role.enum';
import { AuthGuard } from './guards/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
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
    return {
      id: user.sub,
      username: user.username,
      role: user.role,
    };
  }

  @Get('admin-profile')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Obtenir le profil admin' })
  getAdminProfile(@UserDecorator() user: any) {
    return {
      id: user.sub,
      username: user.username,
      role: user.role,
      isAdmin: true,
    };
  }
}
