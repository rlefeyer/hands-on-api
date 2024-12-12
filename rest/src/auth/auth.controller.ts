import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
