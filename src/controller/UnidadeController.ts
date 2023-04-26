import { Request } from "express";
import { getCustomRepository } from "typeorm";
import Unidade from "../models/Unidade";
import UnidadeRepository from "../repository/UnidadeRepository";
import { IUnidade } from "../types/formInterfaces";

class UnidadeController {
    public async indexUnidade(request: Request) {
        const unidadeRepository = getCustomRepository(UnidadeRepository);
        return unidadeRepository.indexUnidade(request.query);
    }

    public async createUnidade(unidadeRequest: IUnidade): Promise<Unidade> {
        const unidadeRepository = getCustomRepository(UnidadeRepository);
        return unidadeRepository.createUnidade(unidadeRequest);
    }

    public async getUnidade(unidadeId: number): Promise<Unidade> {
        const unidadeRepository = getCustomRepository(UnidadeRepository);
        return unidadeRepository.getUnidade(unidadeId);
    }

    public async updateUnidade(unidadeId: number, unidadeRequest: IUnidade): Promise<any> {
        const unidadeRepository = getCustomRepository(UnidadeRepository);
        return unidadeRepository.updateUnidade(unidadeId, unidadeRequest);
    }

    public async deleteUnidade(unidadeId: number): Promise<any> {
        const unidadeRepository = getCustomRepository(UnidadeRepository);
        return unidadeRepository.deleteUnidade(unidadeId);
    }
}

export default UnidadeController;