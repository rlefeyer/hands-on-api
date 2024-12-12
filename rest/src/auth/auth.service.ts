import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginUserDto): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findBy(
        loginDto.username,
        loginDto.password,
      );

      const payload = {
        sub: user.id,
        username: user.username,
        role: user.roles,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedException('Identifiants invalides');
    }
  }
}
