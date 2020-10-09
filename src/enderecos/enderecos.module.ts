import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { EnderecoRepository} from './enderecos.repository';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { AlunosModule } from '../alunos/alunos.module';
import { AlunoRepository} from '../alunos/alunos.repository';

@Module({
    imports: [TypeOrmModule.forFeature([EnderecoRepository]), AlunosModule, AlunoRepository],
    providers: [EnderecosService],
    controllers: [EnderecosController]
})
export class EnderecosModule {}
