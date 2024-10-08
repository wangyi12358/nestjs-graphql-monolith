import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Login {
  @Field()
  token: string;

  @Field({
    description: 'token expired days',
  })
  expiredDays: number;

  // @Field(() => User)
  // user: User;
}
