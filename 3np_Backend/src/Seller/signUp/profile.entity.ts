import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { SellerEntity } from './seller.entity';

@Entity('photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photoPath: string;

  @OneToOne(() => SellerEntity , { cascade: true })
  @JoinColumn()
  profile: SellerEntity;
}