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

import HoraPontos from './HoraPontos';
import Usuario from './Usuario';

@Entity('desbravador_hora_pontos')
class DesbravadorHoraPontos {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    data_chegada: Date;

    @Column()
    hora_chegada: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => HoraPontos)
    @JoinColumn({ name: 'hora_ponto_id' })
    horaPonto: HoraPontos;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default DesbravadorHoraPontos;