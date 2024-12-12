import {
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(30, { message: 'Name must be at most 30 characters long' })
  @Matches(/^[a-zA-Z0-9\s]*$/, {
    message: 'Name must contain only letters, numbers and spaces',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Address must be at least 3 characters long' })
  @MaxLength(100, { message: 'Address must be at most 100 characters long' })
  address: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Phone number must be at least 10 characters long',
  })
  @MaxLength(15, { message: 'Phone number must be at most 15 characters long' })
  @IsMobilePhone('fr-FR')
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
