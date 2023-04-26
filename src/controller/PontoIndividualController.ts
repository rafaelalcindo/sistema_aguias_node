import { Request } from "express";
import { getCustomRepository } from "typeorm";
import PontoIndividual from "../models/PontoIndividual";
import PontoIndividualRepository from "../repository/PontoIndividualRepository";
import { IPontoIndividual } from "../types/formInterfaces";

class PontoIndividualController {
    public async indexPontoIndividual(request: Request) {
        const pontoIndividualRepository = getCustomRepository(PontoIndividualRepository);
        return pontoIndividualRepository.indexPontoIndividual(request.query);
    }

    public async createPontoIndividual(pontoIndividualRequest: IPontoIndividual): Promise<PontoIndividual> {
        const pontoIndividualRepository = getCustomRepository(PontoIndividualRepository);
        return pontoIndividualRepository.createPontoIndividual(pontoIndividualRequest);
    }

    public async getPontoIndividual(pontoIndividualId: number): Promise<PontoIndividual> {
        const pontoIndividualRepository = getCustomRepository(PontoIndividualRepository);
        return pontoIndividualRepository.getPontoIndividual(pontoIndividualId);
    }

    public async updatePontoIndividual(pontoIndividualId: number, pontoIndividualRequest: IPontoIndividual): Promise<any> {
        const pontoIndividualRepository = getCustomRepository(PontoIndividualRepository);
        return pontoIndividualRepository.updatePontoIndividual(pontoIndividualId, pontoIndividualRequest);
    }

    public async deletePontoIndividual(pontoIndividualId: number): Promise<any> {
        const pontoIndividualRepository = getCustomRepository(PontoIndividualRepository);
        return pontoIndividualRepository.deletePontoIndividual(pontoIndividualId);
    }
}

export default PontoIndividualController;