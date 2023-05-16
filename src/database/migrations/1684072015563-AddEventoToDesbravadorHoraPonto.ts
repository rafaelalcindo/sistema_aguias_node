import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddEventoToDesbravadorHoraPonto1684072015563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'desbravador_hora_pontos',
            new TableColumn(
                {
                    name: 'ponto_individual_id',
                    type: 'integer',
                    isNullable: true
                }
            )
        );

        await queryRunner.createForeignKey("desbravador_hora_pontos", new TableForeignKey(
            {
                columnNames: ['ponto_individual_id'],
                referencedColumnNames: ["id"],
                referencedTableName: "ponto_individuals",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        ));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
