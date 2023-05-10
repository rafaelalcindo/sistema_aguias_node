import {
    Entity, Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('hora_pontos')
class HoraPontos {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    descricao: string;

    @Column()
    data_programacao: Date;

    @Column()
    hora_programacao: string;

    @Column()
    pontos: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default HoraPontos;