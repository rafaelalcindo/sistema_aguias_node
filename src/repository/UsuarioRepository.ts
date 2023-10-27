import { EntityRepository, Like, Repository, Raw } from 'typeorm';
import { hash } from 'bcryptjs';

import CrudRepository from './CrudRepository';

import QRCodeProvider from '../provider/QRCodeProvider';

import { IUsuario } from '../types/formInterfaces';
import Usuario from '../models/Usuario';
import { has } from 'lodash';

interface IQueries {
    search?: string;
    ativo?: boolean;
    orderName?: string;
    dateInicial?: Date;
    dateEnd?: Date;
    typeUser?: string;
    orderDirection?: string;
    page?: number;
    limit?: number;
}

@EntityRepository(Usuario)
class UsuarioRepository extends Repository<Usuario> {

    private crudRepository = new CrudRepository();
    private qrCodeProvider = new QRCodeProvider();

    public async indexUsuario(query: IQueries) {
        let where = {};
        let order = {};
        let page = query.page || 1;
        let limit = query.limit || 100;
        let whereSend = {};

        if (query.search) {
            where = [
                {
                    nome: Like(`%${query.search}%`)
                },
                {
                    sobrenome: Like(`%${query.search}%`)
                }
            ]
        }

        if (query.dateInicial && query.dateEnd) {

            where = {
                ...where,
                // created_at: Between(query.dateInicial, query.dateEnd)
                created_at: Raw((alias) => `DATE(${alias}) <= :dateEnd
                &&
                DATE(${alias}) >= :dateInicial
              `, { dateEnd: query.dateEnd, dateInicial: query.dateInicial })
            }
        }

        if (query.ativo) {
            where = {
                ...where,
                ativo: query.ativo
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
            Usuario,
            whereSend,
            order,
            page,
            limit,
            relations
        );
    }

    public async createUsuario(Usuario: IUsuario, fileParam: any): Promise<Usuario | any> {
        Usuario.password = await hash(Usuario.password, 8);

        const usuarioCreate = await this.create(Usuario);

        if (Object.keys(fileParam).length > 0)
            usuarioCreate.foto_perfil = fileParam?.filename;

        const createdUser = await this.save(usuarioCreate);
        const pathQrCode = await this.qrCodeProvider.generateQrCode(String(Usuario.id));

        createdUser.qr_code = pathQrCode;

        await this.update(createdUser.id, createdUser);

        return createdUser;
    }

    public async getUsuario(id: number): Promise<Usuario | any> {
        const usuario = await this.findOne(
            {
                where: { id }
            }
        ) as any;

        delete usuario.password;

        return usuario;
    }

    public async updateUsuario(id: number, usuarioData: IUsuario, fileParam: any): Promise<any> {
        const usuario = await this.findOne({ where: { id } });

        if (usuarioData.password) {
            usuarioData.password = await hash(usuarioData.password, 8);
        }

        if (fileParam) {
            usuarioData.foto_perfil = fileParam?.filename;
        }

        const usuarioObj = {
            ...usuario,
            ...usuarioData
        }

        await this.qrCodeProvider.removeQrCode(usuarioObj.qr_code);

        usuarioObj.qr_code = await this.qrCodeProvider.generateQrCode(String(id));

        return await this.update(id, usuarioObj);
    }

    public async deleteUsuario(id: number): Promise<any> {
        return await this.delete(id);
    }
}

export default UsuarioRepository;