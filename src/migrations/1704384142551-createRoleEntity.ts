import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateRoleEntity1704384142551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'roles', // Tên bảng
                columns: [
                    {
                        name: 'role_id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            'accounts',
            new TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['role_id'],
                referencedTableName: 'roles',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Đảm bảo bạn cung cấp logic để rollback migration nếu cần
        await queryRunner.dropTable('role_entity', true, true, true);
    }

}
