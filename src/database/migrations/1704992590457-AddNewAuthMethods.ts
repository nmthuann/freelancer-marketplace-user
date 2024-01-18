import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class AddNewAuthMethods1704992590457 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'AuthMethods',
            columns: [
                { name: 'auth_method_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'auth_method_name', type: 'varchar', length: '255', isNullable: false },
                { name: 'description', type: 'varchar', length: '255', isNullable: true },
            ],
        }), true);

        // Thêm khóa ngoại
        await queryRunner.createForeignKey('AuthMethods', new TableForeignKey({
            columnNames: ['email'],
            referencedColumnNames: ['auth_method_id'],
            referencedTableName: 'Accounts',
            onUpdate: 'CASCADE', // hoặc 'SET NULL' tùy thuộc vào yêu cầu của bạn
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop khóa ngoại trước khi drop bảng
        const table = await queryRunner.getTable('AuthMethods');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('accountId') !== -1);
        await queryRunner.dropForeignKey('AuthMethods', foreignKey);
        await queryRunner.dropTable('AuthMethods', true);
    }

}
