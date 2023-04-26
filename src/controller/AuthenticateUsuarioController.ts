import { getCustomRepository } from "typeorm";

import SessionUsuarioRepository from "../repository/SessionUsuarioRepository";

interface IRequestUsuario {
    login: string;
    password: string;
}

class AuthenticateUsuarioController {

    /**
     * Parte de Usuários
     * @param requestUser
     * @returns Usuario
     */
    public async login(requestUsuario: IRequestUsuario): Promise<any> {
        const sessionUsuarioRepository = getCustomRepository(SessionUsuarioRepository);
        return await sessionUsuarioRepository.checkLoginUsuario(requestUsuario);
    }
}

export default AuthenticateUsuarioController;