import { EntityRepository, Like, Repository, Raw } from 'typeorm';
import momentTz from 'moment-timezone';
import moment from 'moment-timezone';

import CrudRepository from './CrudRepository';

import { IHoraPontos } from '../types/formInterfaces';
import HoraPontos from '../models/HoraPontos';

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

@EntityRepository(HoraPontos)
class HoraPontosRepository extends Repository<HoraPontos> {

    private crudRepository = new CrudRepository();

    public async indexHoraPonto(query: IQueries) {
        let where = {};
        let order = {};
        let page = query.page || 1;
        let limit = query.limit || 20;
        let whereSend = {};

        if (query.search) {
            where = {
                titulo: Like(`%${query.search}%`)
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
            HoraPontos,
            whereSend,
            order,
            page,
            limit
        );
    }

    public async createHoraPontos(horaPontos: IHoraPontos): Promise<HoraPontos | any> {
        const horaPontoCreate = await this.create(horaPontos);
        horaPontoCreate.created_at = new Date();
        horaPontoCreate.updated_at = new Date();

        horaPontoCreate.data_programacao = momentTz.tz(horaPontoCreate.data_programacao, 'America/Sao_Paulo').format() as any;

        return await this.save(horaPontoCreate);
    }

    public async getHoraPonto(id: number): Promise<HoraPontos | any> {
        const horaPonto = await this.findOne(
            {
                where: { id }
            }
        ) as any;

        return horaPonto;
    }

    public async updateHoraPonto(id: number, horaPontoData: IHoraPontos): Promise<any> {
        const horaPonto = await this.findOne({ where: { id } });

        const horaPontoObj = {
            ...horaPonto,
            ...horaPontoData
        }

        horaPontoObj.data_programacao = momentTz.tz(horaPontoObj.data_programacao, 'America/Sao_Paulo').format() as any;

        return await this.update(id, horaPontoObj);
    }

    public async deleteHoraPonto(id: number): Promise<any> {
        return await this.delete(id);
    }
}

export default HoraPontosRepository;