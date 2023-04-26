import { EntityRepository, Like, Repository, Raw } from 'typeorm';
import moment from 'moment-timezone';

import CrudRepository from './CrudRepository';

import { IUnidade } from '../types/formInterfaces';
import Unidade from '../models/Unidade';

interface IQueries {
    search?: string;
    orderName?: string;
    dateInicial?: Date;
    dateEnd?: Date;
    typeUser?: string;
    orderDirection?: string;
    page?: number;
    limit?: number;
}

@EntityRepository(Unidade)
class UnidadeRepository extends Repository<Unidade> {

    private crudRepository = new CrudRepository();

    public async indexUnidade(query: IQueries) {
        let where = {};
        let order = {};
        let page = query.page || 1;
        let limit = query.limit || 8;
        let whereSend = {};

        if (query.search) {
            where = {
                nome: Like(`%${query.search}%`)
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

        return await this.crudRepository.findAll(
            Unidade,
            whereSend,
            order,
            page,
            limit
        );

    }

    public async createUnidade(Unidade: IUnidade): Promise<Unidade | any> {

        const unidadeCreate = await this.create(Unidade);
        unidadeCreate.created_at = new Date();
        unidadeCreate.updated_at = new Date();

        return await this.save(unidadeCreate);
    }

    public async getUnidade(id: number): Promise<Unidade | any> {
        const unidade = await this.findOne(
            {
                where: { id }
            }
        ) as any;

        return unidade;
    }

    public async updateUnidade(id: number, unidadeData: IUnidade): Promise<any> {
        const unidade = await this.findOne({ where: { id } });

        const unidadeObj = {
            ...unidade,
            ...unidadeData
        }

        unidadeObj.updated_at = new Date();

        return await this.update(id, unidadeObj);
    }

    public async deleteUnidade(id: number): Promise<any> {
        return await this.delete(id);
    }
}

export default UnidadeRepository;

