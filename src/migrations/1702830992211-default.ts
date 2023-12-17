import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702830992211 implements MigrationInterface {
    name = 'Default1702830992211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "availableQuantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "availableQuantity" integer NOT NULL`);
    }

}
