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

import Evento from './Evento';
import Usuario from './Usuario';

@Entity('desbravador_evento')
class DesbravadorEvento {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    usuario_id: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Column()
    evento_id: number;

    @ManyToOne(() => Evento)
    @JoinColumn({ name: 'evento_id' })
    evento: Evento;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default DesbravadorEvento;