import { request, response, Router } from "express";
import HoraPontoController from "../controller/HoraPontoController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const horaPontoRouter = Router();

const horaPontoController = new HoraPontoController();

horaPontoRouter.get('/', ensureAuthenticated, async (request, response) => {
    const horaPontos = await horaPontoController.indexHoraPonto(request);
    return response.json(horaPontos);
});

horaPontoRouter.post('/add', ensureAuthenticated, async (request, response) => {
    const horaPonto = await horaPontoController.createHoraPonto(request.body);
    return response.json(horaPonto);
});

horaPontoRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const horaPonto = await horaPontoController.getHoraPonto(
        Number(request.params.id)
    );

    return response.json(horaPonto);
});

horaPontoRouter.put('/update/:id', ensureAuthenticated, async (request, response) => {
    const result = await horaPontoController.updateHoraPonto(
        Number(request.params.id),
        request.body
    );

    return response.json(result);
});

horaPontoRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
    const result = await horaPontoController.deleteHoraPonto(Number(request.params.id));
    return response.json(result);
});

export default horaPontoRouter;