import { response, Router } from "express";
import sessionUsuarioRouter from "./sessionUsuario.routes";
import unidadeRouter from "./unidade.routes";
import pontoUnidadeRouter from "./pontoUnidade.routes";
import pontoIndividualRouter from "./pontoIndividual.routes";

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Passou pelo teste' });
});

routes.use('/session', sessionUsuarioRouter);
routes.use('/unidade', unidadeRouter);
routes.use('/pontounidade', pontoUnidadeRouter);
routes.use('/pontoindividual', pontoIndividualRouter);


export default routes;