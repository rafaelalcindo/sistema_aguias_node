import {
    Entity, Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinTable,
    ManyToOne,
    OneToMany,
    OneToOne
} from 'typeorm';

import HoraPontos from './HoraPontos';
import Usuario from './Usuario';
import PontoIndividual from './PontoIndividual';

@Entity('desbravador_hora_pontos')
class DesbravadorHoraPontos {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    data_chegada: Date;

    @Column()
    hora_chegada: string;

    @Column()
    usuario_id: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Column()
    hora_ponto_id: number;

    @ManyToOne(() => HoraPontos)
    @JoinColumn({ name: 'hora_ponto_id' })
    horaPonto: HoraPontos;

    @Column()
    ponto_individual_id: number;

    @OneToOne(() => PontoIndividual)
    @JoinColumn({ name: 'ponto_individual_id' })
    pontoIndividual: PontoIndividual;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default DesbravadorHoraPontos;