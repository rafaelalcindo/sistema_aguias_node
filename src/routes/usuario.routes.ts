import { response, Router } from "express";
import multer from "multer";
import UsuarioRepository from "../repository/UsuarioRepository";
import UsuarioController from "../controller/UsuarioController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

import uploadConfing from '../config/uploads';

const usuarioRouter = Router();
const upload = multer(uploadConfing);

const usuarioController = new UsuarioController();


/**
 * Listagem de usuário
 */
usuarioRouter.get('/', async (request, response) => {
    const usuarios = await usuarioController.indexUsuario(request);

    return response.json(usuarios);
});

usuarioRouter.post('/add', upload.single('file'), async (request, response) => {
    let fileObj = {};
    const { file } = request;
    if (file) {
        fileObj = {
            name: file?.originalname,
            file: file?.filename
        }
    }

    const usuario = await usuarioController.createUsuario(request.body, fileObj);

    return response.json(usuario)
});

usuarioRouter.get('/:id', async (request, response) => {
    const usuario = await usuarioController.getUsuario(Number(request.params.id));

    return response.json(usuario);
});

usuarioRouter.put('/update/:id', upload.single("file"), ensureAuthenticated, async (request, response) => {

    let fileObj = {};
    const { file } = request;

    const result = await usuarioController.updateUsuario(
        Number(request.params.id),
        request.body,
        file
    );

    return response.json(result);
});

usuarioRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
    const result = await usuarioController.deleteUsuario(Number(request.params.id));
    return response.json(result);
});

export default usuarioRouter;