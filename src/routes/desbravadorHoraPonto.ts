import { response, Router } from "express";
import DesbravadorHoraPontoController from "../controller/DesbravadorHoraPontoController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const desbravadorHoraPontoRouter = Router();

const desbravadorHoraPontoController = new DesbravadorHoraPontoController();

desbravadorHoraPontoRouter.get('/', ensureAuthenticated, async (request, response) => {
    const desbravadorHoraPonto = await desbravadorHoraPontoController.indexDesbravadorHoraPonto(request);
    return response.json(desbravadorHoraPonto);
});

desbravadorHoraPontoRouter.post('/add', ensureAuthenticated, async (request, response) => {
    const desbravadorHoraPonto = await desbravadorHoraPontoController.createDesbravadorHoraPonto(request.body);
    return response.json(desbravadorHoraPonto);
});

desbravadorHoraPontoRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const desbravadorHoraPonto = await desbravadorHoraPontoController.getDesbravadorHoraPonto(Number(request.params.id));
    return response.json(desbravadorHoraPonto);
});

desbravadorHoraPontoRouter.put('/update/:id', ensureAuthenticated, async (request, response) => {
    const desbravadorHoraPonto = await desbravadorHoraPontoController.updateDesbravadorHoraPonto(
        Number(request.params.id),
        request.body
    );

    return response.json(desbravadorHoraPonto);
});

desbravadorHoraPontoRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
    const result = await desbravadorHoraPontoController.deleteDesbravadorHoraPonto(Number(request.params.id));
    return response.json(result);
});

export default desbravadorHoraPontoRouter;