import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    // Validate the user credentials
    const user = await this.usersService.findBy(username, password);

    if (!user) {
      throw new UnauthorizedException('Nom d’utilisateur ou mot de passe invalide.');
    }

    // Create JWT payload
    const payload = { sub: user.id, username: user.name };

    // Generate the JWT access token
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
