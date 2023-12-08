import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./customer.entity";

@Entity('customerdetails')
export class CustomerDEntity {
    @PrimaryGeneratedColumn()
    id: number;
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  house: string;

  @Column()
  road: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  phoneNumber: string;

  @Column()
  dateOfBirth: string;

  @Column()
  photo: string;

  @OneToOne(() => CustomerEntity, customer => customer.customerdetails,{ cascade: true })
  @JoinColumn()
  customer: CustomerEntity;
}