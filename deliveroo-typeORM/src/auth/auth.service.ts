import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(username: string, password: string): Promise<User> {
    const user = await this.usersService.findBy(username, password);

    if (!user) {
      throw new UnauthorizedException('Nom d’utilisateur ou mot de passe invalide.');
    }

    return user;
  }
}
