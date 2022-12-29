import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { productBuyerRequest } from './dto/productbuyer-request';
import { productSellerRequest } from './dto/productseller-request';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsSvc: ProductsService) {}

  @ApiResponse({
    status: 200,
    type: Object,
    description: 'add the given product'
  })
  @Post('seller/add-product')
  async addProduct(@Body() req: productSellerRequest){
    console.log('request body is%j', req);
    let result = await this.productsSvc.addProduct(req);
    return result;
  }

  @ApiResponse({
    status: 200,
    type: Object,
    description: 'get product for the given name'
  })
  @Get('seller/get-product')
  getProduct(@Query('productname') productname: string){
    return this.productsSvc.getProductByName(productname);
  }

  @Delete('seller/delete/:productId')
  deleteProduct(@Param('productId') productId: string){
    productId = 'p-'+productId;
    return this.productsSvc.deleteProductById(productId);
  }

  @ApiResponse({
    status: 200,
    type: Object,
    description: 'list all available products for bidding'
  })
  @Get('buyer/getallproducts')
  getAllProducts(){
    return this.productsSvc.getAllProducts();
  }
  @Post('buyer/place-bid')
  placeBid(@Body() req: productBuyerRequest){
      return this.productsSvc.placeBid(req);
  }
  @Put('buyer/update-bid/:productid/:email/:newbidamount')
  updateBid(@Body() body:any,@Param('productid') productId, @Param('email') emailID, @Param('newbidamount') newBidAmount){
    console.log('productId:',productId, '-emailId:',emailID, '-newBidAmount:',newBidAmount);
    return this.productsSvc.updateBidAmount(productId,emailID,newBidAmount);
  }

  @Get('seller/show-bids/:productid')
  getBidsByProduct(@Param('productid') productId: string){
    return this.productsSvc.getBidsByProductId(productId);
  }
  @Get('seller/show-bids')
  getAllBids(){
    return this.productsSvc.getAllBids();
  }
}
