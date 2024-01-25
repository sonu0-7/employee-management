import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1706122804565 implements MigrationInterface {
    name = 'InitialMigration1706122804565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`position\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`dob\` date NOT NULL, \`address\` varchar(255) NOT NULL, \`superAdmin\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_817d1d427138772d47eca04885\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`otp\` (\`id\` int NOT NULL AUTO_INCREMENT, \`employee_id\` int NOT NULL, \`otp\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee_positions_position\` (\`employeeId\` int NOT NULL, \`positionId\` int NOT NULL, INDEX \`IDX_1835841c824f81fc939a3f2bf9\` (\`employeeId\`), INDEX \`IDX_ec24b0e3f6cc6fe8cc05d28925\` (\`positionId\`), PRIMARY KEY (\`employeeId\`, \`positionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`employee_positions_position\` ADD CONSTRAINT \`FK_1835841c824f81fc939a3f2bf95\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`employee_positions_position\` ADD CONSTRAINT \`FK_ec24b0e3f6cc6fe8cc05d289255\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee_positions_position\` DROP FOREIGN KEY \`FK_ec24b0e3f6cc6fe8cc05d289255\``);
        await queryRunner.query(`ALTER TABLE \`employee_positions_position\` DROP FOREIGN KEY \`FK_1835841c824f81fc939a3f2bf95\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec24b0e3f6cc6fe8cc05d28925\` ON \`employee_positions_position\``);
        await queryRunner.query(`DROP INDEX \`IDX_1835841c824f81fc939a3f2bf9\` ON \`employee_positions_position\``);
        await queryRunner.query(`DROP TABLE \`employee_positions_position\``);
        await queryRunner.query(`DROP TABLE \`otp\``);
        await queryRunner.query(`DROP INDEX \`IDX_817d1d427138772d47eca04885\` ON \`employee\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
        await queryRunner.query(`DROP TABLE \`position\``);
    }

}
