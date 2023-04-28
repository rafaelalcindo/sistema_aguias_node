import { response, Router } from "express";
import EventoController from "../controller/EventoController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const eventoRouter = Router();

const eventoController = new EventoController();

eventoRouter.get('/', ensureAuthenticated, async (request, response) => {
    const evento = await eventoController.indexEvento(request);
    return response.json(evento);
});

eventoRouter.post('/add', ensureAuthenticated, async (request, response) => {
    const evento = await eventoController.createEvento(request.body);
    return response.json(evento);
});

eventoRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const evento = await eventoController.getEvento(Number(request.params.id));
    return response.json(evento);
});

eventoRouter.put('/update/:id', ensureAuthenticated, async (request, response) => {
    const result = await eventoController.updateEvento(
        Number(request.params.id),
        request.body
    );

    return response.json(result);
});

eventoRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
    const result = await eventoController.deleteEvento(Number(request.params.id));
    return response.json(result);
});

export default eventoRouter;