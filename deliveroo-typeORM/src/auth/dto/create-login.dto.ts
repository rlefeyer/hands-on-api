import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Max, MaxLength } from "class-validator";

export class CreateLogin {
  @ApiProperty({
    example: 'John Doe',
    description: 'The username of the User',
  })
  @IsString()
  @IsNotEmpty({message: 'Please enter your username'})
  @MaxLength(20)
  username: string;

  @ApiProperty({
    example: 'Gre@tP@ssw0rd',
    description: 'The password of the User',
  })
  @IsString()
  @IsNotEmpty({message: 'Please enter your password'})
  @MaxLength(24)
  password: string;
}
