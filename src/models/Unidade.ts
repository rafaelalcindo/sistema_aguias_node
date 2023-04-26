import {
    Entity, Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinTable,
    OneToMany
} from 'typeorm';
import PontoUnidade from './PontoUnidade';

@Entity('unidades')
class Unidade {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;

    @Column()
    equipamentos: string;

    @OneToMany(() => PontoUnidade, (ponto_unidade) => ponto_unidade.unidade)
    ponto_unidades: PontoUnidade[];

    @CreateDateColumn({ 'default': () => 'NOW()' })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Unidade;