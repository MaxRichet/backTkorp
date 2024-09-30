import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnimalService } from '../services/animal.service';
import { Animal } from '../entities/animal.entity';
import { AnimalInput } from '../dto/animal.input';

@Resolver(() => Animal)
export class AnimalResolver {
    constructor(private readonly animalService: AnimalService) {}

    // Query for find all Animal
    @Query(() => [Animal])
    async findAllAnimal() {
        try {
            return await this.animalService.findAll();
        } catch (error) {
            console.error(`Erreur dans findAllAnimal:`, error);
            throw new Error(`Erreur lors de la récupération des information de tous les animaux.`);
        }
    }

    // Query for find an Animal by his ID
    @Query(() => Animal, { name: 'findAnimalById', nullable: true })
    async findById(@Args('id', { type: () => Int }) id: number): Promise<Animal | null> {
        try {
            const result = await this.animalService.findById(id);
            if (!result) {
                throw new NotFoundException('Animal non trouvé');
            }
            return result;
        } catch (error) {
            console.error(`Erreur dans findById:`, error);
            throw new Error(`Erreur lors de la récupération des information d'un animal avec son ID.`);
        }
    }

    // Mutation for create a new Animal
    @Mutation(() => Animal)
    async createAnimal(
        @Args('AnimalInput') createAnimalInput: AnimalInput,
    ) {
        try {
            return await this.animalService.create(createAnimalInput);
        } catch (error) {
            console.error(`Erreur dans createAnimal:`, error);
            throw new Error(`Erreur lors de la création d'un nouvel animal.`);
        }
    }

    // Mutation for modify an Animal
    @Mutation(() => Animal)
    async updateAnimal(
        @Args('id', { type: () => Int }) id: number,
        @Args('AnimalInput') animalInput: AnimalInput,
    ) {
        try {
            return await this.animalService.update(id, animalInput);
        } catch (error) {
            console.error(`Erreur dans updateAnimal:`, error);
            throw new Error(`Erreur lors de la mise à jour des informations d'un animal.`);
        }
    }

    //Mutation for delete an Animal
    @Mutation(() => String)
    async removeAnimal(@Args('id', { type: () => Int }) id: number): Promise<string> {
        try {
            await this.animalService.remove(id);
            return 'La data a bien été supprimée';
        } catch (error) {
            console.error(`Erreur dans removeAnimal:`, error);
            throw new Error(`Erreur lors de la suppression d'un animal.`);
        }
    }

    // Query for find the oldest animal
    @Query(() => Animal, { nullable: true })
    async oldestAnimal(): Promise<Animal | null> {
        try {
            return await this.animalService.findOldestAnimal();
        } catch (error) {
            console.error(`Erreur dans oldestAnimal:`, error);
            throw new Error(`Erreur lors de la récupération des informations de l'animal le plus vieux.`);
        }
    }

    // Query for find the most represented species
    @Query(() => String)
    async getMostRepresentedSpecies() {
        try {
            const { species, count } = await this.animalService.findMostRepresentedSpecies();
            return `L'espèce la plus représentée est ${species} (${count}).`;
        } catch (error) {
            console.error(`Erreur dans getMostRepresentedSpecies:`, error);
            throw new Error(`Erreur lors de la récupération des informations de l'espèce la plus représentée.`);
        }
    }

    // Query for find the heaviest Animal with his name and his weight
    @Query(() => Animal, { nullable: true })
        async heaviestAnimal() {
            try {
                return await this.animalService.findHeaviestAnimal();
            } catch (error) {
                console.error(`Erreur dans heaviestAnimal:`, error);
                throw new Error(`Erreur lors de la récupération des informations de l'animal le plus lourd.`);
            }
    }
}