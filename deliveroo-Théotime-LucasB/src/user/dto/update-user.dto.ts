import { PartialType } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsNotEmpty, IsEmail, Length, Matches } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ description: 'The unique identifier of the user', example: 1 })
  id?: number;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @ApiPropertyOptional({ description: 'The name of the user', example: 'John Doe' })
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  @ApiPropertyOptional({ description: 'The address of the user', example: '123 Main St' })
  address?: string;

  @IsOptional()
  @IsString()
  @Length(10, 15)
  @Matches(/^\+?[0-9]*$/, { message: 'The telephone number must be a valid phone number' })
  @ApiPropertyOptional({ description: 'The telephone number of the user', example: '+1234567890' })
  telephone?: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 100)
  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  password: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  @ApiPropertyOptional({ description: 'The role of the user', example: 'user' })
  role?: string = 'user';
}