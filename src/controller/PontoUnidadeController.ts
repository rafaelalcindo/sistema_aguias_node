import { Request } from "express";
import { getCustomRepository } from "typeorm";
import PontoUnidade from "../models/PontoUnidade";
import PontoUnidadeRepository from "../repository/PontoUnidadeRepository";
import { IPontoUnidade } from "../types/formInterfaces";

class PontoUnidadeController {

    public async indexPontoUnidade(request: Request) {
        const pontoUnidadeRepository = getCustomRepository(PontoUnidadeRepository);
        return pontoUnidadeRepository.indexPontoUnidade(request.query);
    }

    public async createPontoUnidade(pontoUnidadeRequest: IPontoUnidade): Promise<PontoUnidade> {
        const pontoUnidadeRepository = getCustomRepository(PontoUnidadeRepository);
        return pontoUnidadeRepository.createPontoUnidade(pontoUnidadeRequest);
    }

    public async getPontoUnidade(pontoUnidadeId: number): Promise<PontoUnidade> {
        const pontoUnidadeRepository = getCustomRepository(PontoUnidadeRepository);
        return pontoUnidadeRepository.getPontoUnidade(pontoUnidadeId);
    }

    public async updatePontoUnidade(pontoUnidadeId: number, pontoUnidadeRequest: IPontoUnidade): Promise<any> {
        const pontoUnidadeRepository = getCustomRepository(PontoUnidadeRepository);
        return pontoUnidadeRepository.updatePontoUnidade(pontoUnidadeId, pontoUnidadeRequest);
    }

    public async deletePontoUnidade(pontoUnidade: number): Promise<any> {
        const pontoUnidadeRepository = getCustomRepository(PontoUnidadeRepository);
        return pontoUnidadeRepository.deletePontoUnidade(pontoUnidade);
    }

    public async getTodosPontosPorUnidade(unidade_id: number): Promise<any> {
        const pontoUnidadeRepository = getCustomRepository(PontoUnidadeRepository);
        return pontoUnidadeRepository.getTodosPontosPorUsuario(unidade_id);
    }
}

export default PontoUnidadeController;