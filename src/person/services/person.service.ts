import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { Repository } from 'typeorm';
import { PersonInput } from '../dto/person.input';
import { AnimalService } from '../../animal/services/animal.service';

@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        private readonly animalService: AnimalService
    ) {}

    async findAll(): Promise<Person[]> {
        return await this.personRepository.find({ relations: ['animals'] });
    }

    async findById(id: number): Promise<Person> {
        return await this.personRepository.findOne({ where: { id } });
    }

    async create(PersonInpute: PersonInput): Promise<Person> {
        const person = this.personRepository.create(PersonInpute);
        return await this.personRepository.save(person);
    }

    async update(id: number, personInput: PersonInput): Promise<Person> {
        await this.personRepository.update(id, personInput);
        return await this.personRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        const result = await this.personRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Person with ID ${id} not found`);
        }
    }

    async findPersonWithMostAnimals(): Promise<Person> {
        const result = await this.animalService.findOwnerWithMostAnimals();
    
        if (!result || !result.animal_ownerId) {
            return null;
        }
    
        return this.personRepository.findOne({ where: { id: result.animal_ownerId } });
    }

    async findPersonWithMostCats(): Promise<Person> {
        const result = await this.animalService.findOwnerWithMostCats();
    
        if (!result || !result.animal_ownerId) {
            return null;
        }
    
        return await this.personRepository.findOne({ where: { id: result.animal_ownerId } });
    }

    async findHeaviestAnimalGroup() {
        const { animal_ownerId, totalWeight } = await this.animalService.findHeaviestAnimalGroup();
    
        if (!animal_ownerId) {
            return null;
        }
    
        const person = await this.personRepository.findOne({ where: { id: animal_ownerId } });
        console.log('Person:', person);
    
        return {
            person,
            totalWeight,
        };
    }
}