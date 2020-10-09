import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Helper } from 'src/helpers/helpers';
import { EntityRepository, Repository} from 'typeorm';
import { Aluno } from './aluno.entity';
import { CreateAlunoDto } from './dtos/create-aluno.dto';

@EntityRepository(Aluno)
export class AlunoRepository extends Repository<Aluno> {
    async createAluno(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
        const { nome, data_nascimento, cpf, nota} = createAlunoDto;
        const aluno = this.create();
        aluno.nome = nome;
        aluno.data_nascimento = data_nascimento;
        aluno.cpf = cpf;
        aluno.nota = nota;
        try {
            if (!Helper.validaCPF(aluno.cpf)){
                await aluno.save();
                return aluno;
            } else {
                throw new ConflictException('CPF invalido');
            }
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('CPF já está cadastrado');
            } else {
                throw new InternalServerErrorException(
                    'Erro ao salvar no banco de dados'
                );
            }
        }
    }

    async findAluno(id: number): Promise<Aluno>{
        const aluno = await this.findOne(id);
        aluno.cpf = Helper.formatCPF(aluno.cpf)
        return aluno;
    }

    async findAlunos(): Promise<Aluno[]> {
        const alunos = await this.find();
        alunos.forEach((item) => {
            item.cpf = Helper.formatCPF(item.cpf);
        });
        return alunos;
    }
}