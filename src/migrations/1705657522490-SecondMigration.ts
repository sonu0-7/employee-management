import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1705657522490 implements MigrationInterface {
    name = 'SecondMigration1705657522490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` ADD \`status\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` DROP COLUMN \`status\``);
    }

}
