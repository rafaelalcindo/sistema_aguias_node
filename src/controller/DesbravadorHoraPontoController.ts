import { Request } from "express";
import { getCustomRepository } from "typeorm";
import DesbravadorHoraPontoRepository from "../repository/DesbravadorHoraPontoRepository";
import DesbravadorHoraPontos from "../models/DesbravadorHoraPontos";
import { IDesbravadorHoraPonto } from "../types/formInterfaces";

class DesbravadorHoraPontoController {
    public async indexDesbravadorHoraPonto(request: Request) {
        const desbravadorHoraPontoRepository = getCustomRepository(DesbravadorHoraPontoRepository);
        return desbravadorHoraPontoRepository.indexDesbravadorHoraPonto(request.query);
    }

    public async createDesbravadorHoraPonto(desbravadorHoraPontoRequest: IDesbravadorHoraPonto): Promise<DesbravadorHoraPontos> {
        const desbravadorHoraPontoRepository = getCustomRepository(DesbravadorHoraPontoRepository);
        return desbravadorHoraPontoRepository.createDesbravadorPontoHora(desbravadorHoraPontoRequest);
    }

    public async getDesbravadorHoraPonto(desbravadorHoraPontoId: number): Promise<DesbravadorHoraPontos> {
        const desbravadorHoraPontoRepository = getCustomRepository(DesbravadorHoraPontoRepository);
        return desbravadorHoraPontoRepository.getDesbravadorHoraEvento(desbravadorHoraPontoId);
    }

    public async updateDesbravadorHoraPonto(desbravadorHoraPontoId: number, desbravadorHoraPontoData: IDesbravadorHoraPonto): Promise<any> {
        const desbravadorHoraPontoRepository = getCustomRepository(DesbravadorHoraPontoRepository);
        return desbravadorHoraPontoRepository.update(
            desbravadorHoraPontoId,
            desbravadorHoraPontoData
        );
    }

    public async deleteDesbravadorHoraPonto(desbravadorHoraPontoId: number): Promise<any> {
        const desbravadorHoraPontoRepository = getCustomRepository(DesbravadorHoraPontoRepository);
        return desbravadorHoraPontoRepository.deleteDesbravadorHoraEvento(desbravadorHoraPontoId);
    }

    /*
        Funções especiais
     */
}

export default DesbravadorHoraPontoController;