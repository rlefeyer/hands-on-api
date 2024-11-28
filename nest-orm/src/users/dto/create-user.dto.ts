import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @ApiProperty({ description: 'The address of the user' })
  @IsString()
  @IsNotEmpty()
  Address: string;

  @ApiProperty({ description: 'The phone number of the user' })
  @IsString()
  @IsNotEmpty()
  Phone: string;
}
