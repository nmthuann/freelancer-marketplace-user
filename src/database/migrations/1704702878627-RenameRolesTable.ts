import { MigrationInterface, QueryRunner } from "typeorm"

export class RenameRolesTable1704702878627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('role_entity', 'roles');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('roles', 'role_entity');
    }


}
