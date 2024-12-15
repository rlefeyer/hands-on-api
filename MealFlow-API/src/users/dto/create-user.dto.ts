import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, MinLength, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({ description: 'Name of the user', example: 'Paul Debril' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'The name must be at least 3 characters long' }) 
  name: string;

  @ApiProperty({ description: 'Address of the user', example: '123 rue calais' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'The address must be at least 5 characters long' }) 
  address: string;

  //Password
  @ApiProperty({ description: 'Password of the user', example: 'password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'The password must be at least 8 characters long' })
  password: string;

  @ApiProperty({ description: 'Phone number of the user', example: '0606060606' })
  @IsString()
  @IsPhoneNumber('FR', { message: 'Invalid phone number format' }) 
  phone: string;

  @ApiProperty({ description: 'Roles of the user', example: ['Admin'] })
  roles: string;
}
