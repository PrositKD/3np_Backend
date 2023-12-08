import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDTO } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { SellerEntity } from '../signUp/seller.entity';
import { UpdateProductDTO } from './updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(SellerEntity)
    private readonly sellerRepository: Repository<SellerEntity>,
  ) {}

  async createProduct(data: ProductDTO, productPhoto: Express.Multer.File): Promise<ProductEntity> {
    const product = new ProductEntity();
    product.name = data.productName;
    product.description = data.productDescription;
    product.photoPath = productPhoto.filename;

    const seller = await this.sellerRepository.findOne({ where: { id: data.sellerId } });
    if (!seller) {
      throw new NotFoundException('Seller ID not found');
    }

    product.seller = seller;

    return await this.productRepository.save(product);
  } 



  async findProductsBySellerId(sellerId: number): Promise<ProductEntity[]> {
    return this.productRepository.find({ where: {id: sellerId } });
  }

  async deleteProduct(productId: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    await this.productRepository.remove(product);
  }
  
  async updateProduct(productId: number, data: UpdateProductDTO): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
  
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }
    
    await this.productRepository.update(productId,data);
    return this.productRepository.findOneBy({id:productId});
  }

  async findAllProduct(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find(); 
    
    return products;
}

async findProductById(productId: number): Promise<ProductEntity> {
  const product = await this.productRepository.findOne({ where: { id: productId } });

  if (!product) {
    throw new NotFoundException(`Product with ID ${productId} not found`);
  }

  return product;
}
  
  
}
