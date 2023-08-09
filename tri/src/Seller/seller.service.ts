import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerEntity } from './Orders.entity';
import { CreateSellerDto } from './seller.dto';
import { DelivaryEntity } from 'src/Delivary_man/delivary.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(SellerEntity)
    private sellerRepository: Repository<SellerEntity>,
    @InjectRepository(DelivaryEntity)
    private readonly delivaryRepository: Repository<DelivaryEntity>,
  ) {}

  async createSeller(createSellerDto: CreateSellerDto): Promise<SellerEntity> {
    const seller = new SellerEntity();
    seller.Seller = createSellerDto.Seller;
    seller.Receiver = createSellerDto.Receiver;
    seller.Product = createSellerDto.Product;
    seller.Time = createSellerDto.Time;
    seller.Address = createSellerDto.Address;
    seller.Area = createSellerDto.Area;
    
    seller.phone = createSellerDto.phone;
    seller.Status = createSellerDto.Status;

    // const delivary = await this.delivaryRepository.findOne({ where: { email: createSellerDto.delivaryManEmail } });
    // seller.Delivary_man = delivary;
    // if (!delivary) {
    //   throw new NotFoundException('Delivery ID not found');
    // }
    // else{
    return await this.sellerRepository.save(seller);
   // }
  }
}
