import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { ProductFav } from "./ProductFav";

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User

  @OneToMany(() => ProductFav, (product) => product.favorites, {
    eager: true
  })
  @JoinColumn()
  products:   ProductFav[]
}