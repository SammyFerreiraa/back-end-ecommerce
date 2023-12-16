import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702762889722 implements MigrationInterface {
    name = 'Default1702762889722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "allproducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "price" text NOT NULL, "description" text NOT NULL, "availableQuantity" integer NOT NULL, "category" text NOT NULL, "image" text NOT NULL, "featured" boolean NOT NULL, CONSTRAINT "PK_d3456aa1c78520f257097faf1d8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "allproducts"`);
    }

}
