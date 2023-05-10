import { EntityRepository, Like, Repository, Raw } from 'typeorm';

import CrudRepository from './CrudRepository';
import HoraPontoController from '../controller/HoraPontoController';
import PontoIndividualController from '../controller/PontoIndividualController';

import { IDesbravadorHoraPonto, IHoraPontos } from '../types/formInterfaces';
import DesbravadorHoraPontos from '../models/DesbravadorHoraPontos';

interface IQueries {
    search?: string;
    usuario_id?: number;
    hora_ponto_id?: number;
    orderName?: string;
    dateInicial?: Date;
    dateEnd?: Date;
    typeUser?: string;
    orderDirection?: string;
    page?: number;
    limit?: number;
}

@EntityRepository(DesbravadorHoraPontos)
class DesbravadorHoraPontoRepository extends Repository<DesbravadorHoraPontos> {

    private crudRepository = new CrudRepository();
    private horaPontoController = new HoraPontoController();
    private pontoIndividualController = new PontoIndividualController();

    public async indexDesbravadorHoraPonto(query: IQueries) {
        let where = {};
        let order = {};
        let page = query.page || 1;
        let limit = query.limit || 100;
        let whereSend = {};

        if (query.usuario_id) {
            where = {
                ...where,
                usuario_id: query.usuario_id
            }
        }

        if (query.hora_ponto_id) {
            where = {
                ...where,
                hora_ponto_id: query.hora_ponto_id
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

        const relations = ['usuario', 'horaPonto'];
        return await this.crudRepository.findAll(
            DesbravadorHoraPontos,
            whereSend,
            order,
            page,
            limit,
            relations
        );

    }

    public async createDesbravadorPontoHora(desbravadorHoraPonto: IDesbravadorHoraPonto) {
        const desbravadorHoraPontoCreate = await this.create(desbravadorHoraPonto);
        desbravadorHoraPontoCreate.created_at = new Date();
        desbravadorHoraPontoCreate.updated_at = new Date();

        return await this.save(desbravadorHoraPontoCreate);
    }


    public async getDesbravadorHoraEvento(id: number): Promise<DesbravadorHoraPontos> {
        const desbravadorHoraEvento = await this.findOne(
            {
                relations: [
                    'usuario',
                    'horaPonto'
                ],
                where: { id }
            }
        ) as any;

        return desbravadorHoraEvento;
    }

    public async updateDesbravadorHoraEvento(
        id: number,
        desbravadorHoraPontoData: IDesbravadorHoraPonto
    ): Promise<any> {
        const desbravadorHoraPonto = await this.findOne({ where: { id } });

        const desbravadorHoraPontoObj = {
            ...desbravadorHoraPonto,
            ...desbravadorHoraPontoData
        }

        desbravadorHoraPontoObj.updated_at = new Date();

        return await this.update(id, desbravadorHoraPontoObj);
    }

    public async deleteDesbravadorHoraEvento(id: number): Promise<any> {
        return await this.delete(id);
    }

    //** Adicionar os registros de hora pontos */
}

export default DesbravadorHoraPontoRepository;