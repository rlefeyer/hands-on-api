import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private jwtService: JwtService) {
    }

    async signIn(username: string, password: string): Promise<{ access_token: string }> {

        console.log(username, password)
        const user = await this.userService.create({name: username, password, adresse: 'test', telephone: 'test'});

        const payload = { sub: user.id, username: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
