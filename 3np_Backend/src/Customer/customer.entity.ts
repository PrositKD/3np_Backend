import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ObjectType, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product/product.entity';
import { CustomerDEntity } from './customerdetails.entity';

@Entity('customer')
export class CustomerEntity {


  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => CustomerDEntity, customerdetails => customerdetails.customer )
  customerdetails: CustomerDEntity;
  
  @OneToMany(() => ProductEntity, product => product.customer)
  products: ProductEntity[];
}


