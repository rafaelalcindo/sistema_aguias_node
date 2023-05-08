import { EntityRepository, Like, Repository, Raw } from 'typeorm';

import CrudRepository from './CrudRepository';
import EventoController from '../controller/EventoController';
import PontoIndividualController from '../controller/PontoIndividualController';

import { IDesbravadorEvento } from '../types/formInterfaces';
import DesbravadorEvento from '../models/DesbravadorEvento';

interface IQueries {
    search?: string;
    usuario_id?: number;
    evento_id?: number;
    orderName?: string;
    dateInicial?: Date;
    dateEnd?: Date;
    typeUser?: string;
    orderDirection?: string;
    page?: number;
    limit?: number;
}

interface AddMassa {
    evento_id: number;
    usuarios_id: number[];
}

@EntityRepository(DesbravadorEvento)
class DesbravadorEventoRepository extends Repository<DesbravadorEvento> {

    private crudRepository = new CrudRepository();
    private eventoController = new EventoController();
    private pontoIndividualController = new PontoIndividualController();

    public async indexDesbravadorEvento(query: IQueries) {
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

        if (query.evento_id) {
            where = {
                ...where,
                evento_id: query.evento_id
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

        const relations = ['usuario', 'evento'];
        return await this.crudRepository.findAll(
            DesbravadorEvento,
            whereSend,
            order,
            page,
            limit,
            relations
        );
    }

    public async createDesbravadorEvento(desbravadorEvento: IDesbravadorEvento) {
        const desbravadorEventoCreate = await this.create(desbravadorEvento);
        desbravadorEventoCreate.created_at = new Date();
        desbravadorEventoCreate.updated_at = new Date();

        return await this.save(desbravadorEventoCreate);
    }

    public async getDesbravadorEvento(id: number): Promise<DesbravadorEvento | any> {
        const desbravadorEvento = await this.findOne(
            {
                relations: [
                    'usuario',
                    'evento'
                ],
                where: { id }
            }
        ) as any;

        return desbravadorEvento;
    }

    public async updateDesbravadorEvento(
        id: number,
        desbravadorEventoData: IDesbravadorEvento
    ): Promise<any> {
        const desbravadorEvento = await this.findOne({ where: { id } });

        const desbravadorEventoObj = {
            ...desbravadorEvento,
            ...desbravadorEventoData
        }

        desbravadorEventoObj.updated_at = new Date();

        return await this.update(id, desbravadorEventoObj);
    }

    public async deleteDesbravadorEvento(id: number): Promise<any> {
        return await this.delete(id)
    }

    //** Funções de adicionar em massa */

    public async adicionarDesbravadorEventoEmMassa(DadosEmMassa: AddMassa): Promise<any> {
        const evento = await this.eventoController.getEvento(DadosEmMassa.evento_id);

        /* Adicinando os registros de evento */
        let result = DadosEmMassa.usuarios_id.map(async usuarioid => {
            let dadosEvento = {
                evento_id: evento.id,
                usuario_id: usuarioid
            };

            let desbravadorEvento = await this.createDesbravadorEvento(dadosEvento);

            /** Adicionar pontos */
            let dadosPontoIndividual = {
                pontos: evento.ponto_evento,
                descricao: evento.descricao,
                data_pontos: new Date(),
                usuario_id: usuarioid
            }

            let pontoIdividual = await this.pontoIndividualController.createPontoIndividual(dadosPontoIndividual);

            return (desbravadorEvento && pontoIdividual);
        });


        return { result: true };

    }
}

export default DesbravadorEventoRepository;