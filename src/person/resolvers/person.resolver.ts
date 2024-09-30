import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PersonService } from '../services/person.service';
import { Person } from '../entities/person.entity';
import { PersonInput } from '../dto/person.input';
import { Animal } from '../../animal/entities/animal.entity';
import { AnimalService } from '../../animal/services/animal.service';

@Resolver(() => Person)
export class PersonResolver {
  constructor(
    private readonly personService: PersonService,
    private readonly animalService: AnimalService
) {}

    // Query for find all Person
    @Query(() => [Person], { name: 'findAllPerson' })
    async findAll() {
        try {
            return await this.personService.findAll();
        } catch (error) {
            console.error(`Erreur dans findAll:`, error);
            throw new Error(`Erreur lors de la récupération des information de toutes les personnes.`);
        }
    }

    // Query for find a Person by his ID
    @Query(() => Person, { name: 'findPersonById' })
    async findById(@Args('id', { type: () => Int }) id: number) {
        try {
            return await this.personService.findById(id);
        } catch (error) {
            console.error(`Erreur dans findById:`, error);
            throw new Error(`Erreur lors de la récupération des information d'une personne avec son ID.`);
        }
    }

    // Mutation for create a new Person
    @Mutation(() => Person)
    async createPerson(@Args('PersonInput') personInput: PersonInput) {
        try {
            return await this.personService.create(personInput);
        } catch (error) {
            console.error(`Erreur dans createPerson:`, error);
            throw new Error(`Erreur lors de la création d'une nouvelle personne.`);
        }
    }
    
    // Mutation for modify a Person
    @Mutation(() => Person)
    async updatePerson(
        @Args('id', { type: () => Int }) id: number,
        @Args('PersonInput') personInput: PersonInput,
    ) {
        try {
            return await this.personService.update(id, personInput);
        } catch (error) {
            console.error(`Erreur dans updatePerson:`, error);
            throw new Error(`Erreur lors de la modification des information d'une personne.`);
        }
    }

    //Mutation for delete a Person
    @Mutation(() => String)
    async removePerson(@Args('id', { type: () => Int }) id: number): Promise<string> {
        try {
            await this.personService.remove(id);
            return 'La data a bien été supprimée';
        } catch (error) {
            console.error(`Erreur dans removePerson:`, error);
            throw new Error(`Erreur lors de la suppression d'une personne.`);
        }
    }

    // Query for the pets of a Person by his ID
    @Query(() => [Animal], { name: 'findAnimalsByOwnerId' })
    async findAnimalsByOwnerId(@Args('ownerId', { type: () => Number }) ownerId: number) {
        try {
            return await this.animalService.findByOwnerId(ownerId);
        } catch (error) {
            console.error(`Erreur dans findAnimalsByOwnerId:`, error);
            throw new Error(`Erreur lors de la récupération des animaux d'une personne.`);
        }
    }

    // Query for find the person who has the most animals
    @Query(() => Person, { nullable: true })
    async personWithMostAnimals() {
        try {
            return await this.personService.findPersonWithMostAnimals();
        } catch (error) {
            console.error(`Erreur dans personWithMostAnimals:`, error);
            throw new Error(`Erreur lors de la récupération de la personne qui possèce le plus d'animaux.`);
        }
    }

    // Query for find the person with the most cats
    @Query(() => Person, { nullable: true })
    async personWithMostCats() {
        try {
            return await this.personService.findPersonWithMostCats();
        } catch (error) {
            console.error(`Erreur dans personWithMostCats:`, error);
            throw new Error(`Erreur lors de la récupération de la personne qui possèce le plus de chat.`);
        }
    }


    @Query(() => Person, { nullable: true })
    async heaviestAnimalGroup() {
        try {
            const result = await this.personService.findHeaviestAnimalGroup();

            if (!result) {
                throw new Error(`Aucun groupe d'animaux trouvé.`);
            }

            return result;
        } catch (error) {
            console.error(`Erreur dans heaviestAnimalGroup:`, error);
            throw new Error(`Erreur lors de la récupération du groupe d'animaux le plus lourd.`);
        }
    }
}