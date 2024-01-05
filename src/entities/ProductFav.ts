import { Column, Decimal128, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { Favorites } from "./Favorites";

@Entity('favproducts')
export class ProductFav {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  code: string

  @Column({ type: 'decimal' })
  price: Decimal128

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'boolean' })
  offer: boolean

  @Column({ type: 'text' })
  discount: string

  @Column({ type: 'text' })
  category: string

  @Column({ type: 'text' })
  image: string

  @Column({ type: 'boolean' })
  featured: boolean

  @ManyToOne(() => Favorites, (favorites) => favorites.products)
  @JoinColumn()
  favorites: Favorites
}