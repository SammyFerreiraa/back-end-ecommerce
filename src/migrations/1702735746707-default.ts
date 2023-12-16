import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702735746707 implements MigrationInterface {
    name = 'Default1702735746707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "price" text NOT NULL, "description" text NOT NULL, "availableQuantity" integer NOT NULL, "category" text NOT NULL, "image" text NOT NULL, "featured" boolean NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
