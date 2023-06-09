import { response, Router } from "express";
import sessionUsuarioRouter from "./sessionUsuario.routes";
import unidadeRouter from "./unidade.routes";
import pontoUnidadeRouter from "./pontoUnidade.routes";
import pontoIndividualRouter from "./pontoIndividual.routes";
import usuarioRouter from "./usuario.routes";
import eventoRouter from "./evento.routes";
import desbravadorEventoRouter from "./desbravadorEvento.routes";
import horaPontoRouter from "./horaPonto.routes";
import desbravadorHoraPontoRouter from "./desbravadorHoraPonto";
import dashboardRouter from "./dashboard.routes";

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Passou pelo teste' });
});

routes.use('/session', sessionUsuarioRouter);

routes.use('/usuario', usuarioRouter)
routes.use('/unidade', unidadeRouter);
routes.use('/pontounidade', pontoUnidadeRouter);
routes.use('/pontoindividual', pontoIndividualRouter);
routes.use('/evento', eventoRouter);
routes.use('/desbravadorevento', desbravadorEventoRouter);
routes.use('/horaponto', horaPontoRouter);
routes.use('/desbravadorhoraponto', desbravadorHoraPontoRouter);
routes.use('/dashboard', dashboardRouter);


export default routes;