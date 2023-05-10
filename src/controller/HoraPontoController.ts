import { Request } from "express";
import { getCustomRepository } from "typeorm";
import HoraPontos from "../models/HoraPontos";
import HoraPontosRepository from "../repository/HoraPontosRepository";
import { IHoraPontos } from "../types/formInterfaces";

class HoraPontoController {
    public async indexHoraPonto(request: Request) {
        const horaPontoRepository = getCustomRepository(HoraPontosRepository);
        return horaPontoRepository.indexHoraPonto(request.query);
    }

    public async createHoraPonto(horaPonto: IHoraPontos): Promise<HoraPontos> {
        const horaPontoRepository = getCustomRepository(HoraPontosRepository);
        return horaPontoRepository.createHoraPontos(horaPonto);
    }

    public async getHoraPonto(horaPontoId: number): Promise<HoraPontos> {
        const horaPontoRepository = getCustomRepository(HoraPontosRepository);
        return horaPontoRepository.getHoraPonto(horaPontoId);
    }

    public async updateHoraPonto(horaPontoId: number, horaPontoRequest: IHoraPontos): Promise<any> {
        const horaPontoRepository = getCustomRepository(HoraPontosRepository);
        return horaPontoRepository.updateHoraPonto(horaPontoId, horaPontoRequest);
    }

    public async deleteHoraPonto(horaPontoId: number): Promise<any> {
        const horaPontoRepository = getCustomRepository(HoraPontosRepository);
        return horaPontoRepository.deleteHoraPonto(horaPontoId);
    }
}

export default HoraPontoController;