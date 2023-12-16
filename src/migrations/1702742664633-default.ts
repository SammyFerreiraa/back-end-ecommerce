import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702742664633 implements MigrationInterface {
    name = 'Default1702742664633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_cbfb19ddc0218b26522f9fea2eb"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "cart_id" TO "cartId"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_cbfb19ddc0218b26522f9fea2eb" TO "UQ_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93" TO "UQ_cbfb19ddc0218b26522f9fea2eb"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "cartId" TO "cart_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_cbfb19ddc0218b26522f9fea2eb" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
