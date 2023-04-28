import {
    Entity, Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('eventos')
class Evento {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    data_evento: Date;

    @Column()
    ponto_evento: number;

    @Column()
    pontos_adicionados: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Evento;