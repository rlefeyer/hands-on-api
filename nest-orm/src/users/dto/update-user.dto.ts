import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ description: 'The name of the user (optional)' })
  Name?: string;

  @ApiPropertyOptional({ description: 'The address of the user (optional)' })
  Address?: string;

  @ApiPropertyOptional({ description: 'The phone number of the user (optional)' })
  Phone?: string;
}
