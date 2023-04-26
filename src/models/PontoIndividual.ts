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

import Usuario from './Usuario';

@Entity('ponto_individuals')
class PontoIndividual {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    pontos: number;

    @Column({ length: 130 })
    descricao: string;

    @Column()
    data_pontos: Date;

    @Column()
    usuario_id: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default PontoIndividual;