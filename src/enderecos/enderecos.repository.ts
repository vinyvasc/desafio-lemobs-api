import { EntityRepository, Repository} from 'typeorm';
import { Endereco } from './endereco.entity';

@EntityRepository(Endereco)
export class EnderecoRepository extends Repository<Endereco> {}