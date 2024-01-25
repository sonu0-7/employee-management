import { MigrationInterface, QueryRunner } from "typeorm";

export class OtpTableAdded1705930737274 implements MigrationInterface {
    name = 'OtpTableAdded1705930737274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`otp\` (\`id\` int NOT NULL AUTO_INCREMENT, \`employee_id\` int NOT NULL, \`otp\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`otp\``);
    }

}
