import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('allproducts')
export class AllProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  code: string

  @Column({ type: 'text' })
  price: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'int' })
  availableQuantity: number 

  @Column({ type: 'text' })
  category: string

  @Column({ type: 'text' })
  image: string

  @Column({ type: 'boolean' })
  featured: boolean
}