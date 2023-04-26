import { response, Router } from "express";
import PontoUnidadeController from "../controller/PontoUnidadeController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const pontoUnidadeRouter = Router();

const pontoUnidadeController = new PontoUnidadeController();

pontoUnidadeRouter.get('/', ensureAuthenticated, async (request, response) => {
    const pontoUnidades = await pontoUnidadeController.indexPontoUnidade(request);
    return response.json(pontoUnidades);
});

pontoUnidadeRouter.post('/add', ensureAuthenticated, async (request, response) => {
    const pontoUnidade = await pontoUnidadeController.createPontoUnidade(request.body);
    return response.json(pontoUnidade);
});

pontoUnidadeRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const pontoUnidade = await pontoUnidadeController.getPontoUnidade(Number(request.params.id));
    return response.json(pontoUnidade);
});

pontoUnidadeRouter.put('/update/:id', ensureAuthenticated, async (request, response) => {
    const result = await pontoUnidadeController.updatePontoUnidade(
        Number(request.params.id),
        request.body
    );

    return response.json(result);
});

pontoUnidadeRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
    const result = await pontoUnidadeController.deletePontoUnidade(Number(request.params.id));
    return response.json(result);
});

export default pontoUnidadeRouter;