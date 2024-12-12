import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import {jwtConstants} from "./constants";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ]
})

export class AuthModule {}
