import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { Public } from './constant.guard';
import { AuthUserDto } from './dto/auth-user.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 
  @Post()
  @ApiOperation({ summary: 'Get a user by name and password' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the user with the given name and password.', type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error' })
  @UseGuards(ThrottlerGuard)
  @Public()
  async findBy(@Body() authUserDto: AuthUserDto): Promise<User> {
    return this.authService.signIn(authUserDto.name, authUserDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  getProfile(@Request() req) {
    return req.user;
  }
}