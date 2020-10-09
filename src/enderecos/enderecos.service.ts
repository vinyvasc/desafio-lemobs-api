import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EnderecoRepository } from './enderecos.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Endereco } from './endereco.entity';
import { CreateEnderecoDto } from './dtos/create-endereco.dto';
import {getManager} from "typeorm";
import { Aluno } from "../alunos/aluno.entity"

@Injectable()
export class EnderecosService {
    constructor(
        @InjectRepository(EnderecoRepository)
        private enderecoRepository: EnderecoRepository,
    ) {}

    async createEndereco(createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
        const { rua, numero ,complemento, bairro, aluno_id} = createEnderecoDto;
        const entityManager = getManager();
        const aluno = await entityManager.findOne(Aluno, aluno_id);
        console.log(aluno)
        const endereco = this.enderecoRepository.create();
        endereco.rua = rua;
        endereco.numero = numero;
        endereco.complemento = complemento;
        endereco.bairro = bairro;
        endereco.aluno = aluno;
        try {
            await endereco.save();
            return endereco;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao salvar no banco de dados');
        }
    }

    async findEndereco(bairro: string): Promise<Endereco[]> {
        if (bairro) {
            const enderecos = await this.enderecoRepository.find({ bairro: bairro });
            return enderecos;
        } else {
            const enderecos = await this.enderecoRepository.find();
            return enderecos;
        }

    }
}
