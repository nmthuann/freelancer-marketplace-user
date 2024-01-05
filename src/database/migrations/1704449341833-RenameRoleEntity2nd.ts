import { MigrationInterface, QueryRunner } from "typeorm"

export class RenameRoleEntity2nd1704449341833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('roles', 'role_entity');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('role_entity', 'roles');
    }

}
