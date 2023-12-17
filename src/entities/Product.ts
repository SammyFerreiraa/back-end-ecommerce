import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  price: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'text' })
  category: string

  @Column({ type: 'text' })
  image: string

  @Column({ type: 'boolean' })
  featured: boolean

  @Column({ type: 'int' })
  quantity: number

  @ManyToOne(() => Cart, (cart) => cart.products)
  @JoinColumn()
  cart: Cart
}