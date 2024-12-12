import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}

  @Post('login')
  @ApiOperation({ summary: 'Se connecter' })
  @ApiResponse({
    status: 200,
    description: 'Connecté avec succès.',
  })
  @ApiResponse({
    status: 403,
    description: 'Identifiants incorrects',
  })
  async login(username: string, password: string) {
    return this.authService.signIn(username, password);
  }
}
