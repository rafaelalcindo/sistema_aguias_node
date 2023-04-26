import {
    Entity, Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinTable,
    ManyToOne,
    OneToMany
} from 'typeorm';

import { IsUniq } from '@join-com/typeorm-class-validator-is-uniq';

import Unidade from './Unidade';

@Entity('ponto_unidades')
class PontoUnidade {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    pontos: number;

    @Column({ length: 130 })
    descricao: string;

    @Column()
    data_pontos: Date;

    @Column()
    unidade_id: number;

    @ManyToOne(() => Unidade)
    @JoinColumn({ name: 'unidade_id' })
    unidade: Unidade;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default PontoUnidade;