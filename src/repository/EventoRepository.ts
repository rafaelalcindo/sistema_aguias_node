import { EntityRepository, Like, Repository, Raw } from 'typeorm';
import momentTz from 'moment-timezone';
import moment from 'moment-timezone';

import CrudRepository from './CrudRepository';

import { IEventos } from '../types/formInterfaces';
import Evento from '../models/Evento';

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

@EntityRepository(Evento)
class EventoRepository extends Repository<Evento> {

    private crudRepository = new CrudRepository();

    public async indexEvento(query: IQueries) {
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
            Evento,
            whereSend,
            order,
            page,
            limit
        );

    }

    public async createEvento(Evento: IEventos): Promise<Evento | any> {

        const eventoCreate = await this.create(Evento);
        eventoCreate.created_at = new Date();
        eventoCreate.updated_at = new Date();

        eventoCreate.data_evento = momentTz.tz(eventoCreate.data_evento, 'America/Sao_Paulo').format() as any;

        return await this.save(eventoCreate);
    }

    public async getEvento(id: number): Promise<Evento | any> {
        const evento = await this.findOne(
            {
                where: { id }
            }
        ) as any;

        return evento;
    }

    public async updateEvento(id: number, eventoData: IEventos): Promise<any> {
        const evento = await this.findOne({ where: { id } });

        const eventoObj = {
            ...evento,
            ...eventoData
        }

        eventoObj.updated_at = new Date();

        eventoObj.data_evento = momentTz.tz(eventoObj.data_evento, 'America/Sao_Paulo').format() as any;

        return await this.update(id, eventoObj);
    }

    public async deleteEvento(id: number): Promise<any> {
        return await this.delete(id);
    }

}

export default EventoRepository;