import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('dproduct')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) productId: any) {
    return this.productService.deleteProduct(productId);
  }
}

