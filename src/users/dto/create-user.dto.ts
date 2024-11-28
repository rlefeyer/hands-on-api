import {IsAlphanumeric, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Matches, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @ApiProperty({
    description: 'Nom de l\'utilisateur',
    type: String
  })
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Prénom de l\'utilisateur',
    type: String
  })
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric('fr-FR', {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @ApiProperty({
    description: 'Adresse mail de l\'utilisateur',
    type: String
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsInt()
  age: number;

  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;

  @ApiProperty({
    description: 'Adresse de l\'utilisateur',
    type: String
  })
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters,
      at least one uppercase letter,
      one lowercase letter,
      one number and
      one special character`,
  })
  password: string;
}

/*
Example DTO
{
    "name": "John",
    "username": "john",
    "email": "john@john.fr",
    "age": 25,
    "gender": "male",
    "telephone": "0601020304",
    "password": "John1234@"
}
 */