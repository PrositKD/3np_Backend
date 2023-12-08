import { SellerEntity } from 'src/signUp/seller.entity';
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

  @ManyToOne(() => SellerEntity, sellerEntity => sellerEntity.orders)
  seller: SellerEntity;

}   
