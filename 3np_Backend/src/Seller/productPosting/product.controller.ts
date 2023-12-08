import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDTO } from './product.dto';
import { ProductService } from './product.service';
import { diskStorage } from 'multer'; 
import { UpdateProductDTO } from './updateProduct.dto';
import { SessionGuard } from 'src/session.gaurd';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  @UseInterceptors(
    FileInterceptor('productPhoto', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type: Only JPG, JPEG, PNG, and GIF files are allowed.'), false);
        }
      },
      limits: {
        fileSize: 1024 * 1024 * 5, 
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  //@UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async createProduct(@UploadedFile() productPhoto: Express.Multer.File, @Body() data: ProductDTO): Promise<any> {
    return await this.productService.createProduct(data, productPhoto);
  }
  @Get('/search/:sellerId')
  //@UseGuards(SessionGuard)
  async searchProductsBySellerId(@Param('sellerId') sellerId: number): Promise<any> {
    return await this.productService.findProductsBySellerId(sellerId);
  }


  @Get('/getProduct')
  async findAllProduct(): Promise<any> {
    return await this.productService.findAllProduct();
  }
  @Get('/:productId') // Dynamic route with product ID parameter
  async findProductById(@Param('productId') productId: number): Promise<any> {
    return await this.productService.findProductById(productId);
  }


  @Delete('/delete/:productId')
  //@UseGuards(SessionGuard)
async deleteProduct(@Param('productId',ParseIntPipe) productId: number): Promise<void> {
  await this.productService.deleteProduct(productId);
}

@Put('/update/:productId')
//@UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Param('productId') productId: number,
    @Body() data: UpdateProductDTO
  ): Promise<any> {
    return await this.productService.updateProduct(productId, data);
  }

  @Get(`/getImage/:name`)
  getImage(@Param(`name`)name,@Res() res)
  {
    res.sendFile(name,{root:`./uploads`})
  }


}
