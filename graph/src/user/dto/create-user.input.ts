import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  password: string;

  @Field(() => String)
  gender: string;
}
