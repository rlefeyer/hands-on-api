import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findBy(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = {username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    };
}
