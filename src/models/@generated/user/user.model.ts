import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: number;

    /**
     * The username of the user
     */
    @Field(() => String, {nullable:false,description:'The username of the user'})
    username!: string;

    @Field(() => String, {nullable:true})
    name!: string | null;

    @HideField()
    password!: string;

    @HideField()
    salt!: string;
}
