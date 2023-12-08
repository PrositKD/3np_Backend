import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductService } from "./product.service";
import { diskStorage } from "multer";
import { ProductDTO } from "./product.dto";


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
  
  @UsePipes(new ValidationPipe())
  async createProduct(@UploadedFile() productPhoto: Express.Multer.File, @Body() data: ProductDTO): Promise<any> {
    return await this.productService.createProduct(data, productPhoto);
  }
 



}