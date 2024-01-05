import { MigrationInterface, QueryRunner } from "typeorm"

export class RenameRoleEntity3rd1704449570082 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('roles', 'role_entity');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('role_entity', 'roles');
    }

}
