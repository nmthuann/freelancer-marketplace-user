import { MigrationInterface, QueryRunner } from "typeorm"

export class RenameRoleEntity1704384701395 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('role_entity', 'roles');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('roles', 'role_entity');
    }

}
