import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @ApiPropertyOptional({ description: 'The name of the restaurant (optional)' })
  Name?: string;

  @ApiPropertyOptional({ description: 'A short description of the restaurant (optional)' })
  Description?: string;

  @ApiPropertyOptional({ description: 'The address of the restaurant (optional)' })
  Address?: string;

  @ApiPropertyOptional({ description: 'List of menus offered by the restaurant (optional)', type: [String] })
  Menus?: string[];

  @ApiPropertyOptional({ description: 'Rating or note given to the restaurant (optional)' })
  Note?: string;

  @ApiPropertyOptional({ description: 'Operating hours of the restaurant (optional)' })
  schedules?: string;
}
