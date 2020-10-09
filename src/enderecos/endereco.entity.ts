import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Aluno } from "../alunos/aluno.entity"

@Entity()

export class Endereco extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rua: string;

    @Column()
    numero: string;

    @Column({ nullable: true })
    complemento: string;

    @Column({ nullable: true })
    bairro: string;

    @CreateDateColumn()
    criado_em: Date;
  
    @UpdateDateColumn()
    atualizado_em: Date;

    @ManyToOne(() => Aluno, aluno => aluno.enderecos)
    @JoinColumn({ name: "alunoId" })
    aluno: Aluno;


}