import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EnderecosService} from './enderecos.service';
import { CreateEnderecoDto } from './dtos/create-endereco.dto';
import { ReturnEnderecoDto } from './dtos/return-endereco.dto';

@Controller('endereco')
export class EnderecosController {
    constructor(private enderecosService: EnderecosService) {}

    @Post()
    async createEndereco(@Body() createEnderecoDto: CreateEnderecoDto): Promise<ReturnEnderecoDto> {
        const endereco = await this.enderecosService.createEndereco(createEnderecoDto);
        return {
            endereco,
            message: 'Endereço cadastrado com sucesso'
        }
    }

    @Get()
    async getAll(@Query() query) {
        const enderecos = await this.enderecosService.findEndereco(query.bairro);
        return enderecos;
    }

}
