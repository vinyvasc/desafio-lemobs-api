import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { AlunoRepository} from './alunos.repository';
import { AlunosService } from './alunos.service';
import { AlunosController } from './alunos.controller';

@Module({
    imports: [TypeOrmModule.forFeature([AlunoRepository])],
    providers: [AlunosService],
    controllers: [AlunosController]
})
export class AlunosModule {}
