import { Controller, Post, Body } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './seller.dto';


@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('/addproduct')
  async createSeller(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.createSeller(createSellerDto);
  }
}
