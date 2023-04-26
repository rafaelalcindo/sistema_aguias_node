import { EntityRepository, Like, Repository, Raw } from 'typeorm';

import CrudRepository from './CrudRepository';

import { IPontoUnidade } from '../types/formInterfaces';
import PontoUnidade from '../models/PontoUnidade';

interface IQueries {
    search?: string;
    unidade_id?: number;
    orderName?: string;
    dateInicial?: Date;
    dateEnd?: Date;
    typeUser?: string;
    orderDirection?: string;
    page?: number;
    limit?: number;
}

@EntityRepository(PontoUnidade)
class PontoUnidadeRepository extends Repository<PontoUnidade> {

    private crudRepository = new CrudRepository();

    public async indexPontoUnidade(query: IQueries) {
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

        if (query.unidade_id) {
            where = {
                ...where,
                unidade_id: query.unidade_id
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

        const relations = ['unidade'];
        return await this.crudRepository.findAll(
            PontoUnidade,
            whereSend,
            order,
            page,
            limit,
            relations
        );
    }

    public async createPontoUnidade(PontoUnidade: IPontoUnidade): Promise<PontoUnidade | any> {
        const pontoUnidadeCreate = await this.create(PontoUnidade);
        pontoUnidadeCreate.created_at = new Date();
        pontoUnidadeCreate.updated_at = new Date();

        return await this.save(pontoUnidadeCreate);
    }

    public async getPontoUnidade(id: number): Promise<PontoUnidade | any> {
        const pontoUnidade = await this.findOne(
            {
                relations: [
                    'unidade'
                ],
                where: { id }
            }
        ) as any;

        return pontoUnidade;
    }

    public async updatePontoUnidade(id: number, pontoUnidadeData: IPontoUnidade): Promise<any> {
        const pontoUnidade = await this.findOne({ where: { id } });

        const pontoUnidadeObj = {
            ...pontoUnidade,
            ...pontoUnidadeData
        }

        pontoUnidadeObj.updated_at = new Date();

        return await this.update(id, pontoUnidadeObj);
    }

    public async deletePontoUnidade(id: number): Promise<any> {
        return await this.delete(id);
    }
}

export default PontoUnidadeRepository;