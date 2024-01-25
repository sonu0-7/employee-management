import { MigrationInterface, QueryRunner } from "typeorm";

export class ThirdMigration1705658671058 implements MigrationInterface {
    name = 'ThirdMigration1705658671058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` DROP COLUMN \`status\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` ADD \`status\` varchar(255) NOT NULL`);
    }

}
