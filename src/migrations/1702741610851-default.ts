import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702741610851 implements MigrationInterface {
    name = 'Default1702741610851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cart_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_cbfb19ddc0218b26522f9fea2eb" UNIQUE ("cart_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_cbfb19ddc0218b26522f9fea2eb" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_cbfb19ddc0218b26522f9fea2eb"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_cbfb19ddc0218b26522f9fea2eb"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cart_id"`);
    }

}
