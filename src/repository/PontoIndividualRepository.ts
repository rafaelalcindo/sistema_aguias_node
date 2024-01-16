import { EntityRepository, Like, Repository, Raw, getConnection } from 'typeorm';

import CrudRepository from './CrudRepository';

import { IPontoIndividual } from '../types/formInterfaces';
import PontoIndividual from '../models/PontoIndividual';

interface IQueries {
    search?: string;
    usuario_id?: number;
    orderName?: string;
    dateInicial?: Date;
    dateEnd?: Date;
    typeUser?: string;
    orderDirection?: string;
    page?: number;
    limit?: number;
}

@EntityRepository(PontoIndividual)
class PontoIndividualRepository extends Repository<PontoIndividual> {

    private crudRepository = new CrudRepository();

    public async indexPontoIndividual(query: IQueries) {
        let where = {};
        let order = {};
        let page = query.page || 1;
        let limit = query.limit || 100;
        let whereSend = {};

        if (query.search) {
            where = {
                descricao: Like(`%${query.search}%`)
            }
        }

        if (query.usuario_id) {
            where = {
                ...where,
                usuario_id: query.usuario_id
            }
        }

        if (query.dateInicial && query.dateEnd) {

            where = {
                ...where,
                // created_at: Between(query.dateInicial, query.dateEnd)
                data_pontos: Raw((alias) => `DATE(${alias}) <= :dateEnd
                &&
                DATE(${alias}) >= :dateInicial
              `, { dateEnd: query.dateEnd, dateInicial: query.dateInicial })
            }
        }

        if (query.orderName && query.orderDirection) {

            const orderName = String(query.orderName);
            const orderDirection = query.orderDirection;

            order = {

                order: {
                    [orderName]: orderDirection
                }

            };

        } else {
            order = {

                order: {
                    "created_at": 'DESC'
                }

            };
        }

        whereSend = {
            where
        };

        const relations = ['usuario'];
        return await this.crudRepository.findAll(
            PontoIndividual,
            whereSend,
            order,
            page,
            limit,
            relations
        );
    }

    public async createPontoIndividual(PontoIndividual: IPontoIndividual) {
        const pontoIndividualCreate = await this.create(PontoIndividual);
        pontoIndividualCreate.created_at = new Date();
        pontoIndividualCreate.updated_at = new Date();

        return await this.save(pontoIndividualCreate);
    }

    public async getPontoIndividual(id: number): Promise<PontoIndividual | any> {
        const pontoIndividual = await this.findOne(
            {
                relations: [
                    'usuario'
                ],
                where: { id }
            }
        ) as any;

        return pontoIndividual;
    }

    public async updatePontoIndividual(id: number, pontoIndividualData: IPontoIndividual): Promise<any> {
        const pontoIndividual = await this.findOne({ where: { id } });

        const pontoIndividualObj = {
            ...pontoIndividual,
            ...pontoIndividualData
        }

        pontoIndividualObj.updated_at = new Date();

        return await this.update(id, pontoIndividualObj);
    }

    public async deletePontoIndividual(id: number): Promise<any> {
        return await this.delete(id);
    }

    /**
     * functions outside the normal CRUD
     */

    public async getTodosPontosPorUsuario(usuario_id: number): Promise<any> {
        const pontoTotal = await getConnection()
            .getRepository(PontoIndividual)
            .createQueryBuilder('ponto_individual')
            .select('SUM(pontos)', 'pontos')
            .where('usuario_id = :usuario_id ', { usuario_id })
            .getRawOne();

        return pontoTotal ? pontoTotal : 0;
    }

}

export default PontoIndividualRepository;