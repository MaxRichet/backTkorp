import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../entities/animal.entity';
import { AnimalInput } from '../dto/animal.input';
import { Person } from '../../person/entities/person.entity';

@Injectable()
export class AnimalService {
    constructor(
        @InjectRepository(Animal) private animalRepository: Repository<Animal>,
        @InjectRepository(Person) private personRepository: Repository<Person>,
    ) {}

    async findAll(): Promise<Animal[]> {
        return await this.animalRepository.find({ relations: ['person'] });
    }

    async findById(id: number): Promise<Animal> {
        return await this.animalRepository.findOne({ where: { id } });
    }

    async create(createAnimalInput: AnimalInput): Promise<Animal> {
        const person = await this.personRepository.findOneBy({
            id: createAnimalInput.ownerId,
        });

        if (!person) {
            throw new Error('Person not found');
        }

        const animal = this.animalRepository.create({ ...createAnimalInput, person });
        return this.animalRepository.save(animal);
    }

    async update(id: number, animalInput: AnimalInput): Promise<Animal> {
        await this.animalRepository.update(id, animalInput);
        return await this.animalRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        const result = await this.animalRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Animal with ID ${id} not found`);
        }
    }

    async findByOwnerId(ownerId: number): Promise<Animal[]> {
        return await this.animalRepository.find({ where: { ownerId: ownerId } });
    }

    async findOldestAnimal(): Promise<Animal | null> {
        return await this.animalRepository
            .createQueryBuilder('animal')
            .orderBy('animal.dateOfBirth', 'ASC')
            .getOne();
    }

    async findMostRepresentedSpecies(): Promise<{ species: string; count: number }> {
        const result = await this.animalRepository
          .createQueryBuilder('animal')
          .select('animal.species, COUNT(*) AS count')
          .groupBy('animal.species')
          .orderBy('count', 'DESC')
          .limit(1)
          .getRawOne();
    
        return {
          species: result.species,
          count: parseInt(result.count, 10),
        };
    }

    async findOwnerWithMostAnimals() {
        const result = await this.animalRepository
            .createQueryBuilder('animal')
            .select('animal.ownerId')
            .addSelect('COUNT(animal.id)', 'animalCount')
            .groupBy('animal.ownerId')
            .orderBy('animalCount', 'DESC')
            .getRawOne();

        return result;
    }

    async findOwnerWithMostCats() {
        const result = await this.animalRepository
            .createQueryBuilder('animal')
            .where('animal.species = :species', { species: 'cat' })
            .select('animal.ownerId')
            .addSelect('COUNT(animal.id)', 'animalCount')
            .groupBy('animal.ownerId')
            .orderBy('animalCount', 'DESC')
            .getRawOne();
        
        return result;
    }

    async findHeaviestAnimal() {
        return await this.animalRepository
            .createQueryBuilder('animal')
            .select('animal.name, animal.weight')
            .orderBy('animal.weight', 'DESC')
            .getRawOne();
    }

    async findHeaviestAnimalGroup() {
        const result = await this.animalRepository
            .createQueryBuilder('animal')
            .select('animal.ownerId')
            .addSelect('SUM(animal.weight)', 'totalWeight')
            .groupBy('animal.ownerId')
            .orderBy('totalWeight', 'DESC')
            .getRawOne();
        return result;
    } 
}