import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1704467614200 implements MigrationInterface {
    name = 'Default1704467614200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_877a1b205937c28b5789cffbba9"`);
        await queryRunner.query(`CREATE TABLE "favproducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "code" text NOT NULL, "price" numeric NOT NULL, "description" text NOT NULL, "offer" boolean NOT NULL, "discount" text NOT NULL, "category" text NOT NULL, "image" text NOT NULL, "featured" boolean NOT NULL, "favoritesId" uuid, CONSTRAINT "PK_631a7026db03f34186e27e3f742" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "favoritesId"`);
        await queryRunner.query(`ALTER TABLE "favproducts" ADD CONSTRAINT "FK_cdc9005229a6afebc14a5d2b691" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favproducts" DROP CONSTRAINT "FK_cdc9005229a6afebc14a5d2b691"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "favoritesId" uuid`);
        await queryRunner.query(`DROP TABLE "favproducts"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_877a1b205937c28b5789cffbba9" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
