import { Injectable } from '@nestjs/common';
import { ViewProductDTO } from './viewProduct.dto';

@Injectable()
export class ViewProductService {
  getProductsBySellerId(sellerId: string): string[] {
    
    return ['Product 1', 'Product 2', 'Product 3'];
  }
}

