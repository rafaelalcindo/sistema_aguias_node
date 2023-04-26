import { response, Router } from "express";
import PontoIndividualController from "../controller/PontoIndividualController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const pontoIndividualRouter = Router();

const pontoIndividualController = new PontoIndividualController();

pontoIndividualRouter.get('/', ensureAuthenticated, async (request, response) => {
    const pontoIndividuais = await pontoIndividualController.indexPontoIndividual(request);
    return response.json(pontoIndividuais);
});

pontoIndividualRouter.post('/add', ensureAuthenticated, async (request, response) => {
    const pontoIndividual = await pontoIndividualController.createPontoIndividual(request.body);
    return response.json(pontoIndividual);
});

pontoIndividualRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const pontoIndividual = await pontoIndividualController.getPontoIndividual(Number(request.params.id));
    return response.json(pontoIndividual);
});

pontoIndividualRouter.put('/update/:id', ensureAuthenticated, async (request, response) => {
    const result = await pontoIndividualController.updatePontoIndividual(
        Number(request.params.id),
        request.body
    );

    return response.json(result);
});

pontoIndividualRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
    const result = await pontoIndividualController.deletePontoIndividual(Number(request.params.id));
    return response.json(result);
});

export default pontoIndividualRouter;

