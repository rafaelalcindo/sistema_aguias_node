import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { compare, hash } from "bcryptjs";
import { resolve } from 'path';
import moment from 'moment';

import SessionProvider from "../provider/SessionProvider";

import Usuario from "../models/Usuario";

interface Request {
    login: string;
    password: string;
}

@EntityRepository(Usuario)
class SessionUsuarioRepository extends Repository<Usuario> {

    private sessionProvider;

    constructor() {
        super();
        this.sessionProvider = new SessionProvider();
    }

    public async checkLoginUsuario({ login, password }: Request): Promise<any> {
        const usuario = await this.findOne({ where: { login } }) as any;

        if (!usuario) {
            throw new Error('Senha ou Login estão incorretos');
        }

        const passwordMatched = await compare(password, usuario.password);

        if (!passwordMatched) {
            throw new Error('Senha ou Login estão incorretos');;
        }

        const token = await this.sessionProvider.generateToken(String(usuario.id));

        usuario.remember_token = token;

        delete usuario.password;

        await this.update(usuario.id, usuario);

        return {
            usuario,
            token
        }
    }

    public async checkUsuarioToken(token: string): Promise<any> {
        const usuario = await this.findOne({ where: { remember_token: token } });
        return usuario;
    }
}

export default SessionUsuarioRepository;