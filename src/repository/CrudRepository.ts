import { getRepository } from 'typeorm';

class CrudRepository {

    public async findAll(model: any, wheres?: any, orders?: any, page = 1, limit = 10, relations: any = []): Promise<any> {
        const models = getRepository(model);

        let filter = {
            skip: ((page - 1) * limit),
            take: limit,
            relations,
            ...wheres,
            ...orders
        }

        const [list, total] = await models.findAndCount(
            filter
        );

        const result = {
            list,
            totalRegister: total,
            currentPage: page,
            limit,
            lastPage: Math.ceil(total / limit)
        }

        return result;
    }

    public async findAllQueryBuild(queryBuilder: any, nameTableId: string, page = 1, limit = 10): Promise<any> {
        const list = await queryBuilder
            .limit(limit)
            .skip(((page - 1) * limit))
            .getRawMany();

        const total = await queryBuilder
            .select(`COUNT(${nameTableId})`, "total")
            .getRawOne();

        const result = {
            list,
            totalRegister: Number(total.total),
            currentPage: page,
            limit,
            lastPage: Math.ceil(total.total / limit)
        };

        return result;
    }
}

export default CrudRepository;
