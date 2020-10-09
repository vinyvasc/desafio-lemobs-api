import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository } from "typeorm";
import { AlunoRepository } from './alunos.repository';
import { Aluno } from './aluno.entity';
import { CreateAlunoDto } from './dtos/create-aluno.dto';
import { UpdateAlunoDto } from './dtos/update-aluno.dto';
import { Helper } from 'src/helpers/helpers';

@Injectable()
export class AlunosService {
    constructor(
        @InjectRepository(AlunoRepository)
        private alunoRepository: AlunoRepository,
    ) {}

    async createAluno(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
        return this.alunoRepository.createAluno(createAlunoDto);
    }

    async getAll(): Promise<Aluno[]> {
        return this.alunoRepository.findAlunos();
    }

    async getById(id: number): Promise<Aluno> {
        const aluno = await this.alunoRepository.findOne(id);
        if (!aluno) throw new NotFoundException('Aluno não encontrado');
        return aluno;

    }

    async getAlunosAboveAvg(): Promise<Aluno[]> {
        const qb = await getRepository(Aluno).createQueryBuilder("aluno");
        const alunos = qb.groupBy("aluno.id")
                         .having("aluno.nota > " + qb.subQuery()
                                                     .select("AVG(nota)")
                                                     .from(Aluno, "aluno")
                                                     .getQuery())
                         .getMany();
        return alunos;
    }

    async getAlunoByNotaCriteria(nota: string, criterio: string): Promise<Aluno[]> {
        const aluno = await getRepository(Aluno).createQueryBuilder("aluno")
            .where("aluno.nota" + criterio + " :nota", {nota: nota}).getMany();
        return aluno;
    }

    async getEnderecoAlunoById(aluno_id: number) {
        const aluno = await this.alunoRepository.createQueryBuilder("aluno")
        .where("aluno.id = :aluno_id", {aluno_id: aluno_id})
        .leftJoinAndSelect("aluno.enderecos", "endereco")
        .getMany();
        const endereco = await Helper.formatEndereco(aluno);
        const formatted_enderecos_aluno = {
            total: aluno[0].enderecos.length,
            enderecos: endereco
        }
        return formatted_enderecos_aluno;
    }

    async updateAluno(updateAlunoDto: UpdateAlunoDto, id: number): Promise<Aluno> {
        const aluno = await this.getById(id);
        const { nome, data_nascimento, cpf, nota} = updateAlunoDto;
        aluno.nome = nome;
        aluno.data_nascimento = data_nascimento;
        aluno.cpf = cpf;
        aluno.nota = nota;
        try {
            await aluno.save();
            return aluno;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao salvar os dados no banco de dados',
              );
        }
    }

    async deleteAluno(id: number) {
        await this.alunoRepository.delete(id);
    }

}
