import { response, Router } from "express";
import UnidadeController from "../controller/UnidadeController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const unidadeRouter = Router();

const unidadeController = new UnidadeController();

unidadeRouter.get('/', ensureAuthenticated, async (request, response) => {
    const unidades = await unidadeController.indexUnidade(request);
    return response.json(unidades);
})

unidadeRouter.post('/add', ensureAuthenticated, async (request, response) => {
    const unidade = await unidadeController.createUnidade(request.body);
    return response.json(unidade);
});

unidadeRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const unidade = await unidadeController.getUnidade(Number(request.params.id));
    return response.json(unidade);
});

unidadeRouter.put('/update/:id', ensureAuthenticated, async (request, response) => {
    const result = await unidadeController.updateUnidade(
        Number(request.params.id),
        request.body
    );

    return response.json(result);
});

unidadeRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
    const result = await unidadeController.deleteUnidade(Number(request.params.id));
    return response.json(result);
});

export default unidadeRouter;