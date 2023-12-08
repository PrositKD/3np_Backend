import { CustomerEntity } from 'src/customer/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';




@Entity('product')

export class ProductEntity {

  @PrimaryGeneratedColumn()

  id: number;

  @Column()

  name: string;

  @Column()

  description: string;

  @Column()

  photoPath: string;
  @ManyToOne(() => CustomerEntity, customer => customer.products)
  customer: CustomerEntity;

}

@Entity('Seproduct')

export class SProductEntity {

  @PrimaryGeneratedColumn()

  id: number;

  @Column()

  name: string;

  @Column()

  description: string;

  @Column()

  photoPath: string;
}


