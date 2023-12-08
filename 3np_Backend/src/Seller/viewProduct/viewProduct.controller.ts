import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { ViewProductDTO } from './viewProduct.dto';
import { ViewProductService } from './viewProduct.service';

@Controller('vproduct')
export class ViewProductController {
  constructor(private readonly viewProductService: ViewProductService) {}

  @Get('/seller/:sellerId')
  getProductsBySellerId(@Param('sellerId', ValidationPipe) sellerId: string): string[] {
    return this.viewProductService.getProductsBySellerId(sellerId);
  }
}
