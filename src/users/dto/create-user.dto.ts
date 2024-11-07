import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', required: true })
  name: string;
  @ApiProperty({ example: '+33 7 66 23 97 97', required: false })
  phone: string | null;
  @ApiProperty({ example: '42 rue Sainte-Catherine', required: true })
  address: string;
}
