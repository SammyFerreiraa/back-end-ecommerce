import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1704464859146 implements MigrationInterface {
    name = 'Default1704464859146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "REL_e747534006c6e3c2f09939da60" UNIQUE ("userId"), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD "favoritesId" uuid`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_877a1b205937c28b5789cffbba9" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_877a1b205937c28b5789cffbba9"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "favoritesId"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
    }

}
