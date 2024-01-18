// import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

// export class AddNewColumnAccounts1704992459974 implements MigrationInterface {

// public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.addColumn('Accounts', new TableColumn({
//             name: 'sub',
//             type: 'varchar',
//             isNullable: true, // hoặc false tùy thuộc vào yêu cầu của bạn
//         }));
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.dropColumn('Accounts', 'sub');
//     }

// }
