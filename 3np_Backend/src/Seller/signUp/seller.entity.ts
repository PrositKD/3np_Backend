import { ProductEntity } from 'src/productPosting/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { PhotoEntity } from './profile.entity';

@Entity()
export class SellerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  shopName: string;

  @Column()
  shopType: string;

  @Column()
  shopAddress: string;

  @Column()
  gender: string;

  @Column()
  dob: string;

  @Column()
  photoPath: string;


  @OneToMany(() => ProductEntity, productEntity => productEntity.seller, { cascade: true })
orders: ProductEntity[];

  

}
