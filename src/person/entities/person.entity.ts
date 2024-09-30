import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Animal } from '../../animal/entities/animal.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Person {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    phoneNumber: string;

    @Field(() => [Animal], { nullable: true })
    @OneToMany(() => Animal, (animal) => animal.person)
    animals?: Animal[];
}

@ObjectType()
export class HeaviestAnimalGroup {
    @Field(() => Person, { nullable: true })
    person: Person;

    @Field(() => Number, { nullable: true })
    totalWeight: number;
}