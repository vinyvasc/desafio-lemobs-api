import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Endereco } from '../enderecos/endereco.entity';

@Entity()
@Unique(['cpf'])
export class Aluno extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200 })
    nome: string;

    @Column({ type: 'date'})
    data_nascimento: Date;

    @Column({ type: 'char', length: 11})
    cpf: string;

    @Column({ type: 'float'})
    nota: number;

    @CreateDateColumn()
    criado_em: Date;
  
    @UpdateDateColumn()
    atualizado_em: Date;

    @OneToMany(() => Endereco, enderecos => enderecos.aluno)
    enderecos: Endereco[];

}