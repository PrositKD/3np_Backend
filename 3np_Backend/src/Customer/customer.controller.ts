import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { customerService } from "./customer.service";
import { customerdto, logindto, productDTO, updatedto } from "./customer.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { ProductEntity, SProductEntity } from "src/Customer/product/product.entity";
import { SessionGuard } from "src/session.gaurd";

@Controller('customer')
export class customerController {

    constructor(private readonly customerService: customerService) {}

    @Get('/index')
    getIndex(): any {
        return this.customerService.getIndex();
    }

    // @Get('/search/:query')
    // searchProduct(@Param('query') query: number): Promise<ProductEntity[]>{
    //     return this.customerService.searchProduct(query);
    // }

    @Post('/signin')
    signIn(@Body() data: logindto, @Session() session) {

        if (this.customerService.signIn(data)) {
            session.email = data.email;
            return data;
        }
        else {

            return false;
        }
        // return this.adminService.signIn(data);
    }
    @Post('login')//done//
    @UsePipes(new ValidationPipe())
    async login(@Body() data:logindto, @Session() session ):Promise<any>
    {
        if (await this.customerService.login(data)){
            // session.email=loginDTO.email;
            session.email = data.email;

            const email=data.email;
            this.customerService.veri(email);
            
            //const tableData=await this.customerService.getDataByEmpEmail(data.email);
            return {message: 'success',name: data.email};
        }
        else
        {
            return {message: 'failed'};
        }
    }

    @Post('/create-profile')//Done
    @UseInterceptors(FileInterceptor('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
                cb(null, true);
            } else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 10000000000 },
        storage: diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    }))
    @UsePipes(new ValidationPipe())
    createProfile(@Body() data: customerdto,@UploadedFile() imageobj: Express.Multer.File): any {
        console.log(data);
        
           // console.log(imageobj.filename);
        
            data.myfile = "sss";
        return this.customerService.createProfile(data);

       
    }

  

    @Get('/buy')//done
    //@UseGuards(SessionGuard)
    addToCart(@Body() productId: productDTO): any {
       return this.customerService.buyProduct(productId);
    }

   
    @Post('/search/:productId')
    removeFromCart(@Param('productId') productId: string): any {
        return this.customerService.search(productId);
    }

    @Post('/communicate-with-seller/:orderId')
    communicateWithSeller(@Param('orderId') orderId: string, @Body() message: string): any {
        return this.customerService.communicateWithSeller(orderId, message);
    }

    @Post('/review-product/:productId')
    @UsePipes(new ValidationPipe())
    reviewProduct(@Param('productId') productId: string, @Body() reviewData: any): any {
        return this.customerService.reviewProduct(productId, reviewData);
    }

    @Post('/make-payment/:orderId')
    makePayment(@Param('orderId') orderId: string, @Body() paymentData: any): any {
        return this.customerService.makePayment(orderId, paymentData);
    }

   
        
    @Put('/update/:id')//Done profile
    //@UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateById(@Param('id',ParseIntPipe) id: number, @Body() data: updatedto): object {
        return this.customerService.updateById(id, data);
    }


    @Delete('/delete_order/:id')//Done
    //@UseGuards(SessionGuard)
    deleteAccount(@Param('id',ParseIntPipe) id: number): any {
        return this.customerService.deleteAccount(id);
    }
    



    
    uploadFile(@UploadedFile() myfileobj: Express.Multer.File): object {
        console.log(myfileobj);
        return { message: "file uploaded" };
    }

    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
        res.sendFile(name, { root: './uploads' });
    }
    @Get('/orders/:id')//Done

    findOrdersByLocation(@Param('id') id: number): Promise<ProductEntity[]> {
      return this.customerService.getOrderByid(id);
    }
    @Get('/products/:email')
  async findAllProductsByEmail(@Param('email') email: string): Promise<ProductEntity[]> {
    return this.customerService.findAllProductsByEmail(email);
  }

//




@Get('/get/:customerId')// customerdetaisla
async getCustomer(@Param('customerId', ParseIntPipe) customerId: number): Promise<any> {
    const customer = await this.customerService.getCustomer(customerId);
    return customer;
}





  @Get('/getallproduct')//done
  async getAllSProducts(): Promise<SProductEntity[]> {
    return this.customerService.getAllSProducts();
  }
}
  
  
