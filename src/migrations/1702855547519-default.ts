import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702855547519 implements MigrationInterface {
    name = 'Default1702855547519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "code" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "allproducts" ADD "code" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allproducts" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "code"`);
    }

}
