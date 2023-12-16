import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702739072276 implements MigrationInterface {
    name = 'Default1702739072276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_7a637e662f7c4b3a85001c53dfd" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_7a637e662f7c4b3a85001c53dfd"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "cartId"`);
        await queryRunner.query(`DROP TABLE "carts"`);
    }

}
