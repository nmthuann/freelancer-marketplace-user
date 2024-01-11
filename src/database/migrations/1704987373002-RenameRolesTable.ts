import { MigrationInterface, QueryRunner } from "typeorm"

export class RenameRolesTable1704987373002 implements MigrationInterface {

     public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('role_entity', 'roles');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('roles', 'role_entity');
    }

}
