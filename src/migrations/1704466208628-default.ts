import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1704466208628 implements MigrationInterface {
    name = 'Default1704466208628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "favoritesId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_8c5bb8649ae04edcfaf93d57574" UNIQUE ("favoritesId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8c5bb8649ae04edcfaf93d57574" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8c5bb8649ae04edcfaf93d57574"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_8c5bb8649ae04edcfaf93d57574"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "favoritesId"`);
    }

}
