import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsNotEmpty, Length, Matches } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  @Field()
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 15)
  @Matches(/^\+?[0-9]*$/, { message: 'The telephone number must be a valid phone number' })
  @Field()
  telephone: string;
}
