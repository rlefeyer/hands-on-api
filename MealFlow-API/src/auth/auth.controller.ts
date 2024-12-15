import { Controller, Get, Post, UseGuards, Body, Req, UnauthorizedException, Request } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Public } from './public.decorator';
import { Throttle } from '@nestjs/throttler';

class SigninDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 3, ttl: 6000 } })
  @Public()
  @Post('signin')
  @ApiBody({ type: SigninDto })
  async signin(@Body() signinDto: SigninDto) {
    const { name, password } = signinDto;

    const user = await this.authService.validateUser(name, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.generateJwt(user);
    return { accessToken: token };
  }

  @Public()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


}
