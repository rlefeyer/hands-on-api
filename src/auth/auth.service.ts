import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {AuthUserDto} from "./dto/auth-user.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}

    async login(user: AuthUserDto) {
        const foundUser = await this.userService.findBy(user.username, user.password);
        if (!foundUser) return;
        const payload = { username: foundUser.username, sub: foundUser.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
