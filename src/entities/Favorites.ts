import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User

  @OneToMany(() => Product, (product) => product.cart, {
    eager: true
  })
  @JoinColumn()
  products:   Product[]
}