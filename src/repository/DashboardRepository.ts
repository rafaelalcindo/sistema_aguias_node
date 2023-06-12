import { EntityRepository, Like, Repository, Raw, getConnection } from 'typeorm';
import { Request } from 'express';
import momentTz from 'moment-timezone';
import moment from 'moment-timezone';

import CrudRepository from './CrudRepository';
import Usuario from '../models/Usuario';
import PontoIndividual from '../models/PontoIndividual';
import Unidade from '../models/Unidade';
import PontoUnidade from '../models/PontoUnidade';


class DashboardRepository {

    public async usuariosPontos(request: Request) {

        let DateToday = moment();

        const usuarioConnection = await getConnection()
            .getRepository(PontoIndividual)
            .createQueryBuilder('ponto_individual')
            .leftJoin('ponto_individual.usuario', 'usuario')
            .select('SUM(ponto_individual.pontos)', 'pontos')
            .addSelect('usuario.nome', 'nome')
            .addSelect('usuario.sobrenome', 'sobrenome')
            .where('usuario.ativo = true')
            .andWhere('YEAR(ponto_individual.data_pontos) = :ano ', { ano: DateToday.format('YYYY') })
            .groupBy('usuario.id')
            .orderBy('pontos', 'DESC')
            .getRawMany();

        return usuarioConnection;
    }

    public async unidadePontos(request: Request) {
        let DateToday = moment();

        const unidadeConnection = await getConnection()
            .getRepository(PontoUnidade)
            .createQueryBuilder('ponto_unidade')
            .leftJoin('ponto_unidade.unidade', 'unidade')
            .select('SUM(ponto_unidade.pontos)', 'pontos')
            .addSelect('unidade.nome', 'nome')
            .andWhere('YEAR(ponto_unidade.data_pontos) = :ano ', { ano: DateToday.format('YYYY') })
            .groupBy('unidade.id')
            .orderBy('pontos', 'DESC')
            .getRawMany();

        return unidadeConnection;
    }

}

export default DashboardRepository;