import { Request } from "express";
import { getCustomRepository } from "typeorm";
import Usuario from "../models/Usuario";
import UsuarioRepository from "../repository/UsuarioRepository";
import { IUsuario } from "../types/formInterfaces";

class UsuarioController {
    public async indexUsuario(request: Request) {
        const usuarioRepository = getCustomRepository(UsuarioRepository);
        return usuarioRepository.indexUsuario(request.query);
    }

    public async createUsuario(usuarioRequest: IUsuario, file: any): Promise<Usuario> {
        const usuarioRepository = getCustomRepository(UsuarioRepository);
        return usuarioRepository.createUsuario(usuarioRequest, file);
    }

    public async getUsuario(usuarioId: number): Promise<Usuario> {
        const usuarioRepository = getCustomRepository(UsuarioRepository);
        return usuarioRepository.getUsuario(usuarioId);
    }

    public async updateUsuario(usuarioId: number, usuarioRequest: IUsuario, file: any): Promise<any> {
        const usuarioRepository = getCustomRepository(UsuarioRepository);
        return usuarioRepository.updateUsuario(usuarioId, usuarioRequest, file);
    }

    public async deleteUsuario(usuarioId: number): Promise<any> {
        const usuarioRepository = getCustomRepository(UsuarioRepository);
        return usuarioRepository.deleteUsuario(usuarioId);
    }
}

export default UsuarioController;