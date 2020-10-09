import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AlunosModule } from './alunos/alunos.module';
import { EnderecosModule } from './enderecos/enderecos.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AlunosModule, EnderecosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
