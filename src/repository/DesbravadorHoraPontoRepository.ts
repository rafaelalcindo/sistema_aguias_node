import { EntityRepository, Like, Repository, Raw } from 'typeorm';
import moment from 'moment';

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

interface IDbvHoraPonto {
    usuario_id: number;
    hora_ponto_id: number;
    data_chegada: Date;
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

    public async adicionarHoraPonto(DbvHotaPonto: IDbvHoraPonto) {
        const horaPonto = await this.horaPontoController.getHoraPonto(DbvHotaPonto.hora_ponto_id);
        const dataChegada = moment(DbvHotaPonto.data_chegada);
        const dataMarcada = moment(`${moment.utc(horaPonto.data_programacao).format('YYYY-MM-DD')} ${horaPonto.hora_programacao}`);

        const diffDates = dataChegada.diff(dataMarcada, 'minutes')

        let addPontos = 0;

        if (diffDates <= 1) {
            addPontos = horaPonto.pontos;
        } else if (diffDates <= 8) {
            addPontos = Math.ceil((horaPonto.pontos / 2));
        } else if (diffDates <= 60) {
            addPontos = Math.ceil((horaPonto.pontos / 3));
        }

        const PontoIndividualObj = {
            pontos: addPontos,
            descricao: `Chagada na hora marcada as ${dataMarcada.format('DD/MM/YYYY hh:mm:ss')}, a hora em que chegou foi ${dataChegada.format('DD/MM/YYYY hh:mm:ss')}`,
            data_pontos: new Date(),
            usuario_id: DbvHotaPonto.usuario_id
        }

        const pontoIndividualCreated = await this.pontoIndividualController.createPontoIndividual(PontoIndividualObj);

        const desbravadorHoraPontosObj = {
            usuario_id: DbvHotaPonto.usuario_id,
            hora_ponto_id: horaPonto.id,
            data_chegada: dataChegada.toDate(),
            hora_chegada: dataChegada.format('hh:mm:ss'),
            ponto_individual_id: pontoIndividualCreated.id
        }

        return await this.createDesbravadorPontoHora(desbravadorHoraPontosObj);
    }
}

export default DesbravadorHoraPontoRepository;