import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702831746003 implements MigrationInterface {
    name = 'Default1702831746003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "quantity"`);
    }

}
