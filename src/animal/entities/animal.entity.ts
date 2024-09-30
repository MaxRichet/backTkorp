import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Animal {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    dateOfBirth: string;

    @Field()
    @Column()
    species: string;

    @Field()
    @Column()
    breed: string;

    @Field()
    @Column()
    color: string;

    @Field()
    @Column()
    weight: number;

    @Field(() => Int)
    @Column()
    ownerId: number;

    @Field(() => Person)
    @ManyToOne(() => Person, (person) => person.animals)
    @JoinColumn({ name: 'ownerId' })
    person: Person;
}
