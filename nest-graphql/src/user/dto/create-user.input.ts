import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEnum, IsInt, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field() // Ajout de ce champ pour le lier à GraphQL
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Field(() => Int)
  @IsInt()
  @Min(0, { message: 'L’âge doit être un nombre positif.' })
  age: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsEnum(['m', 'f', 'u'], { message: 'Le genre doit être "m", "f" ou "u".' })
  gender: string;
}
