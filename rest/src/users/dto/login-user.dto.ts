import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'thekairi78' })
  username: string;

  @ApiProperty({ example: 'defaultpassword' })
  password: string;
}
