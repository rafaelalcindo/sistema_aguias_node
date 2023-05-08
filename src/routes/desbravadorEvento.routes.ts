import { response, Router } from "express";
import DesbravadorEventoController from "../controller/DesbravadorEventoController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const desbravadorEventoRouter = Router();

const desbravadorEventoController = new DesbravadorEventoController();

desbravadorEventoRouter.get('/', ensureAuthenticated, async (request, response) => {
    const desbravadorEvento = await desbravadorEventoController.indexDesbravadorEvento(request);
    return response.json(desbravadorEvento);
});

desbravadorEventoRouter.post('/add', ensureAuthenticated, async (request, response) => {
    const desbravadorEvento = await desbravadorEventoController.createDesbravadorEvento(request.body);
    return response.json(desbravadorEvento);
});

desbravadorEventoRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const desbravadorEvento = await desbravadorEventoController.getDesbravadorEvento(Number(request.params.id));
    return response.json(desbravadorEvento);
});

desbravadorEventoRouter.put('/update/:id', ensureAuthenticated, async (request, response) => {
    const desbravadorEvento = await desbravadorEventoController.updateDesbravadorEvento(
        Number(request.params.id),
        request.body
    );

    return response.json(desbravadorEvento);
});

desbravadorEventoRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
    const result = await desbravadorEventoController.deleteDesbravadorEvento(Number(request.params.id));
    return response.json(result);
});

/**
 * Funções especiais
 */
desbravadorEventoRouter.post('/addmassa', ensureAuthenticated, async (request, response) => {
    const result = await desbravadorEventoController.adicionarEmMassa(request.body);

    return response.json(result);
});

export default desbravadorEventoRouter;