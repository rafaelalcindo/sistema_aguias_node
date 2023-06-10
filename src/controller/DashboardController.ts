import { Request } from "express";
import { getCustomRepository } from "typeorm";

import DashboardRepository from "../repository/DashboardRepository";

class DashboardController {

    private dashboard;

    constructor() {
        this.dashboard = new DashboardRepository();
    }

    public async GraphOfBars(request: Request) {
        return await this.dashboard.usuariosPontos(request);
    }
}

export default DashboardController;