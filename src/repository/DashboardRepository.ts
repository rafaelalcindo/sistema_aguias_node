import { EntityRepository, Like, Repository, Raw, getConnection } from 'typeorm';
import { Request } from 'express';
import momentTz from 'moment-timezone';
import moment from 'moment-timezone';

import CrudRepository from './CrudRepository';
import Usuario from '../models/Usuario';
import PontoIndividual from '../models/PontoIndividual';


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

}

export default DashboardRepository;