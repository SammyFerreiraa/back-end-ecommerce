import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1703175816894 implements MigrationInterface {
    name = 'Default1703175816894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" money NOT NULL`);
        await queryRunner.query(`ALTER TABLE "allproducts" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "allproducts" ADD "price" money NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allproducts" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "allproducts" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric NOT NULL`);
    }

}
