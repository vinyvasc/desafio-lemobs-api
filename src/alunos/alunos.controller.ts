import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateAlunoDto } from './dtos/create-aluno.dto';
import { ReturnAlunoDto } from './dtos/return-aluno.dto';
import { AlunosService} from './alunos.service';
import { UpdateAlunoDto } from './dtos/update-aluno.dto';

@Controller('aluno')
export class AlunosController {
    constructor(private alunosService: AlunosService) {}

    @Get('media')
    async getAlunosAboveAvg() {
        const alunos = await this.alunosService.getAlunosAboveAvg()
        return alunos;
    }
    @Get(':nota/criterio/:criterio')
    async getAlunoByNotaCriteria(@Param() param) {
        const alunos = await this.alunosService.getAlunoByNotaCriteria(param.nota, param.criterio);
        return alunos;
    }

    @Get(':aluno_id/endereco')
    async getAlunoEnderecoById(@Param() param) {
        const enderecos = await this.alunosService.getEnderecoAlunoById(param.aluno_id);
        return enderecos;
    }

    @Post()
    async createAluno(@Body() createAlunoDto: CreateAlunoDto): Promise<ReturnAlunoDto> {
        const aluno = await this.alunosService.createAluno(createAlunoDto);
        return {
            aluno,
            message: 'Aluno cadastrado com sucesso'
        }
    }

    @Get()
    async getAll() {
        const alunos = await this.alunosService.getAll();
        return alunos;
    }

    @Get(':id')
    async getById(@Param() param) {
        const aluno = await this.alunosService.getById(param.id)
        return aluno;
    }

/*

*/
    @Put(':id')
    async updateAluno(
        @Body() updateAlunoDto: UpdateAlunoDto,
        @Param() param
        ): Promise<ReturnAlunoDto> {
            const aluno = await this.alunosService.updateAluno(updateAlunoDto, param.id);
            return {
                aluno,
                message: 'Aluno atualizado com sucesso'
            }
    }

    @Delete(':id')
    async deleteAluno(@Param() param) {
        await this.alunosService.deleteAluno(param.id);
        return {
            message: 'Aluno removido com sucesso'
        }
    }
}
