import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AnimalInput {
  @Field()
  name: string;

  @Field()
  dateOfBirth: string;

  @Field()
  species: string;

  @Field()
  breed: string;

  @Field()
  color: string;

  @Field()
  weight: number;

  @Field(() => Int)
  ownerId: number;
}
