import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  deleteProduct(productId: string): string {
    return `Product with ID ${productId} has been deleted successfully.`;
  }
}
