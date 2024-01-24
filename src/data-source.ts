import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

const url = process.env.DB_URL

export const AppDataSource = new DataSource({
  type: 'postgres',
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
	name: "default",
  url,
  synchronize: true,
  logging: true,
})