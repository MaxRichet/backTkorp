import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PersonInput {
  @Field()
  lastName: string;

  @Field()
  firstName: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;
}