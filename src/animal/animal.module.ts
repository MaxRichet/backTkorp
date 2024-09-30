import { Module, forwardRef } from '@nestjs/common';
import { Animal } from './entities/animal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalService } from './services/animal.service';
import { AnimalResolver } from './resolvers/animal.resolver';
import { PersonModule } from '../person/person.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Animal]),
        forwardRef(() => PersonModule)
    ],
        providers: [AnimalService, AnimalResolver],
        exports: [AnimalService]
})
export class AnimalModule {}