import { CreateUserInput } from './create-user.input';
import { IsString, IsInt, IsOptional, IsNotEmpty, Length, Matches } from 'class-validator';
import { InputType, Int, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
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
