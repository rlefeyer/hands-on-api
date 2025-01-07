import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./roles.guard";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ]

})
export class AuthModule {}
