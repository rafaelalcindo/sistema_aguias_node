import { Request } from "express";
import { getCustomRepository } from "typeorm";
import DesbravadorEvento from "../models/DesbravadorEvento";
import DesbravadorEventoRepository from "../repository/DesbravadorEventoRepository";
import { IDesbravadorEvento } from "../types/formInterfaces";

class DesbravadorEventoController {
    public async indexDesbravadorEvento(request: Request) {
        const desbravadorEventoRepository = getCustomRepository(DesbravadorEventoRepository);
        return desbravadorEventoRepository.indexDesbravadorEvento(request.query);
    }

    public async createDesbravadorEvento(desbravadorEventoRequest: IDesbravadorEvento): Promise<DesbravadorEvento> {
        const desbravadorEventoRepository = getCustomRepository(DesbravadorEventoRepository);
        return desbravadorEventoRepository.createDesbravadorEvento(desbravadorEventoRequest);
    }

    public async getDesbravadorEvento(desbravadorEventoId: number): Promise<DesbravadorEvento> {
        const desbravadorEventoRepository = getCustomRepository(DesbravadorEventoRepository);
        return desbravadorEventoRepository.getDesbravadorEvento(desbravadorEventoId);
    }

    public async updateDesbravadorEvento(desbravadorEventoId: number, desbravadorEventoRequest: IDesbravadorEvento): Promise<any> {
        const desbravadorEventoRepository = getCustomRepository(DesbravadorEventoRepository);
        return desbravadorEventoRepository.updateDesbravadorEvento(
            desbravadorEventoId,
            desbravadorEventoRequest
        );
    }

    public async deleteDesbravadorEvento(desbravadorEventoId: number): Promise<any> {
        const desbravadorEventoRepository = getCustomRepository(DesbravadorEventoRepository);
        return desbravadorEventoRepository.deleteDesbravadorEvento(desbravadorEventoId);
    }

    /**
    * Funções especiais 
    */
    public async adicionarEmMassa(DadosAdd: any): Promise<any> {
        const desbravadorEventoRepository = getCustomRepository(DesbravadorEventoRepository);
        return desbravadorEventoRepository.adicionarDesbravadorEventoEmMassa(DadosAdd);
    }
}

export default DesbravadorEventoController;