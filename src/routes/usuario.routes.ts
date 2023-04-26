import { response, Router } from "express";
import UsuarioRepository from "../repository/UsuarioRepository";

const usuarioRouter = Router();

const usuarioRepository = new UsuarioRepository();


/**
 * Listagem de usuário
 */
usuarioRouter.get('/', async (request, response) => {
    const usuarios = await usuarioRepository.indexUsuario(request.query);

    return response.json(usuarios);
});

usuarioRouter.post('/add', async (request, response) => {
    const usuario = await usuarioRepository.createUsuario(request.body);

    return usuario;
});

usuarioRouter.get('/:id', async (request, response) => {
    const usuario = await usuarioRepository.getUsuario(Number(request.params.id));

    return usuario;
});

export default usuarioRouter;