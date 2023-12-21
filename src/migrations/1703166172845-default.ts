import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1703166172845 implements MigrationInterface {
    name = 'Default1703166172845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allproducts" ADD "offer" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "allproducts" ADD "discount" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "offer" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "discount" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "offer"`);
        await queryRunner.query(`ALTER TABLE "allproducts" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "allproducts" DROP COLUMN "offer"`);
    }

}
