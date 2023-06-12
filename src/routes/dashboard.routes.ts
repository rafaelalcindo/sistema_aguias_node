import { request, response, Router } from "express";
import DashboardController from "../controller/DashboardController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const dashboardRouter = Router();

const dashboardController = new DashboardController();

dashboardRouter.get('/dashboradbar', ensureAuthenticated, async (request, response) => {
    const dashboardBar = await dashboardController.GraphOfBars(request);
    return response.json(dashboardBar);
});

dashboardRouter.get('/dashboardcircle', ensureAuthenticated, async (request, response) => {
    const dashboardCicle = await dashboardController.GraphOfCircle(request);
    return response.json(dashboardCicle);
});

export default dashboardRouter;