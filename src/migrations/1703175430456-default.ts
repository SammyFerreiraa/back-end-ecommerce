import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1703175430456 implements MigrationInterface {
    name = 'Default1703175430456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allproducts" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "allproducts" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "allproducts" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "allproducts" ADD "price" text NOT NULL`);
    }

}
