import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDTO } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(SProductEntity)
    private readonly productRepository: Repository<SProductEntity>,
  ) {}

  async createProduct(data: ProductDTO, productPhoto: Express.Multer.File): Promise<SProductEntity> {
    const product = new SProductEntity();
    product.name = data.productName;
    product.description = data.productDescription;
    product.photoPath = productPhoto.filename;
    product.id=data.sellerId;

    return await this.productRepository.save(product);
  }
  
  
}