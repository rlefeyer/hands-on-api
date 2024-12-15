import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Role } from './role.enum';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string) {
    const user = await this.usersService.findBy(name, password);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async generateJwt(user: any) {
    const payload = { sub: user.id, username: user.name, role: user.roles };
    return this.jwtService.signAsync(payload);
  }
}
