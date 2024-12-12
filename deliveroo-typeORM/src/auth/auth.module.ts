import { UserService } from './../../../deliveroo-graph-ql/src/user/user.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserService],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
