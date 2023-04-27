import { response, Router } from "express";
import UsuarioRepository from "../repository/UsuarioRepository";
import UsuarioController from "../controller/UsuarioController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const usuarioRouter = Router();

const usuarioController = new UsuarioController();


/**
 * Listagem de usuário
 */
usuarioRouter.get('/', async (request, response) => {
    const usuarios = await usuarioController.indexUsuario(request);

    return response.json(usuarios);
});

usuarioRouter.post('/add', async (request, response) => {
    const usuario = await usuarioController.createUsuario(request.body);

    return response.json(usuario)
});

usuarioRouter.get('/:id', async (request, response) => {
    const usuario = await usuarioController.getUsuario(Number(request.params.id));

    return response.json(usuario);
});

usuarioRouter.put('/update/:id', ensureAuthenticated, async (request, response) => {
    const result = await usuarioController.updateUsuario(
        Number(request.params.id),
        request.body
    );

    return response.json(result);
});

usuarioRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
    const result = await usuarioController.deleteUsuario(Number(request.params.id));
    return response.json(result);
});

export default usuarioRouter;