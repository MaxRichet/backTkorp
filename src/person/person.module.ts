import { Module, forwardRef } from '@nestjs/common';
import { Person } from './entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from './services/person.service';
import { PersonResolver } from './resolvers/person.resolver';
import { AnimalModule } from '../animal/animal.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Person]),
        forwardRef(() => AnimalModule)
    ],
    providers: [PersonService, PersonResolver],
    exports: [TypeOrmModule, PersonService]
})
export class PersonModule {}