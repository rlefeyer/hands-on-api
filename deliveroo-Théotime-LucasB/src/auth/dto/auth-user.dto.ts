import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  password: string;
}
