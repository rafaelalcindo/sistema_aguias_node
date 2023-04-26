import { response, Router } from "express";
import AuthenticateUsuarioController from "../controller/AuthenticateUsuarioController";

const sessionUsuarioRouter = Router();

const authenticateUsuario = new AuthenticateUsuarioController();

/**
 * Usuário do sistema
 */
sessionUsuarioRouter.post('/loginusuario', async (request, response) => {
    try {
        const result = await authenticateUsuario.login(request.body);

        return response.json(result);
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionUsuarioRouter;