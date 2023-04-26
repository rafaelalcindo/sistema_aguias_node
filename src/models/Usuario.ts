import {
    Entity, Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinTable,
    ManyToOne
} from 'typeorm';

import { IsUniq } from '@join-com/typeorm-class-validator-is-uniq';

import Unidade from './Unidade';

@Entity('usuarios')
class Usuario {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 100 })
    nome: string;

    @IsUniq({ message: 'Esse login já está cadastrado' })
    @Column({ length: 100 })
    login: string;

    @Column({ length: 100 })
    password: string;

    @Column({ length: 20 })
    cep: string;

    @Column({ length: 80 })
    endereco: string;

    @Column({ length: 100 })
    complemento: string;

    @Column({ length: 20 })
    cidade: string;

    @Column({ length: 20 })
    estado: string;

    @Column({ length: 20 })
    tel: string

    @Column({ length: 20 })
    cel: string;

    @Column()
    ativo: boolean;

    @Column()
    data_nasc: Date;

    @Column()
    rg: string;

    @Column()
    cpf: string;

    @Column()
    tamanho_camisa: string;

    @Column()
    nivel: number;

    @Column()
    qr_code: string;

    @Column()
    foto_perfil: string;

    @Column()
    remember_token: string;

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

export default Usuario;