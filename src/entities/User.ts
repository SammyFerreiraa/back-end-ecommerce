import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { Favorites } from "./Favorites";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text', unique: true,  })
  email: string

  @Column({ type: 'boolean', default: false })
  admin: boolean

  @Column({ type: 'text' })
  password: string

  @OneToOne(() => Cart, (cart) => cart.id, { cascade: true, eager: true })
  @JoinColumn()
  cart: Cart

  @OneToOne(() => Favorites, (favorites) => favorites.id, { cascade: true, eager: true })
  @JoinColumn()
  favorites: Favorites
}