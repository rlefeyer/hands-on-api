import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {jwtConstants} from "./constants";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
