import { Body, Injectable } from '@nestjs/common';
import { productsellermodel } from 'src/db/productsellerschema';
import { productSellerRequest } from './dto/productseller-request';
import { productBuyerRequest } from './dto/productbuyer-request';
import { productbuyermodel } from 'src/db/productbuyerschema';

@Injectable()
export class ProductsService {
    constructor() { }
    addProduct = async function (req: productSellerRequest) {
        let result;
        try {
            if (req.Email && !req.Email.includes('@')) {
                result = {result: 'Email ID is invalid'};
                throw new Error('Email ID is invalid');
            }
            let bidEndDate = new Date(req.BidEndDate);
            console.log('bidEndDate is ',bidEndDate);
            let currentDate = new Date();
            if(bidEndDate<= currentDate){
                result = {result: 'BidEndDate cannot be less than current date'};
                throw new Error('BidEndDate cannot be less than current date');
            }
            let dbresult = await productsellermodel.find();
            if(dbresult && dbresult.length > 0){
                req['productId'] = "p-"+dbresult.length 
            } else {
                req['productId'] = "p-"+ 0;
            }
            let product = new productsellermodel(req);
console.log("add prod"+ req);
            let dbResult = await product.save();
            if (dbResult !== undefined) {
                result = { result: 'Product Added Successfully' };
            }
            else {
                result = { result: 'Failed to add Product' };
            }
        } catch (error) {
            console.log('error is ', error);
            result = { result: result ? result : error?.data?.message? error.data.message: error?.Error?error.Error:'error occured' };
        } finally {
            console.log('final result is',result);
            return result;
        }
    }

    getProductByName = async function (productname: string) {
        let product = new productsellermodel();
        let dbresult = await productsellermodel.findOne({ 'ProductName': productname });
        console.log('getProduct data::', dbresult);
        return dbresult;
    }

    async getProductById(productId: string) {
        let dbresult = await productsellermodel.find({'productId':productId});
        // if(dbresult && dbresult.length > 1){
        //    let id =  productId.split('-');
        //    dbresult = dbresult[id[1]];
        // } else {
        //     dbresult = dbresult[0];
        // }
        return dbresult[0];
    }
    deleteProductById: any = async function(productId: string){
        let sellerProduct = await this.getProductById(productId);
        console.log('seller product is ',sellerProduct);
        let deleteFlag = false;
        if(sellerProduct) {
            let bidEndDate = new Date(sellerProduct.BidEndDate);
        
        let currentDate = new Date();
        console.log('bidEndDate ', bidEndDate, ' currentDate ',currentDate);
        deleteFlag = bidEndDate < currentDate ? false: true;
        }
        console.log('deleteFlag if bidEndDate expired ', deleteFlag);
        let bidProduct: any[] = await this.getBidByProductId(productId);
        console.log('bidProduct is ',bidProduct);
        if(bidProduct && bidProduct.length > 0){
            deleteFlag = false;
            console.log('deleteFlag if atleast one bid exist ', deleteFlag);
        }
        if(deleteFlag){
            return await productsellermodel.deleteOne({"productId":productId});
        }
        return {result:"Product Cannot be deleted. Either has atleast one bid or the BidEndDate is expired"};
    }
    getAllProducts = async function(){
        let dbresult = await productsellermodel.find();
        console.log('getProduct data::',dbresult);
        return dbresult;
    }
    getAllBids = async function () {
        let dbresult = await productbuyermodel.find();
        console.log('getProduct data::',dbresult);
        return dbresult;
    }
    async placeBid(req: productBuyerRequest){
        let sellerProduct;
        sellerProduct = await this.getProductById(req.productId);
        if(sellerProduct == null || sellerProduct == undefined){
            return {result: 'Invalid Product'};
        }
        let bidProduct: any[] = await this.getBidByProductId(req.productId);
        let insertFlag = true;
        console.log('product retrieved is ',sellerProduct);
        console.log('bid retrieved is ',bidProduct);
        for(const item of bidProduct){
            console.log('item is ',item);
            if(req.Email == item?.Email){
                console.log('req.Email == item?.Email ',req.Email == item?.Email);
                insertFlag  = false;
                break;
            }
        }
        console.log('insertFlag for email compare is ',insertFlag);
        
        let currentDate = new Date();
        let bidEndDate = new Date(sellerProduct?.BidEndDate);
        console.log('currentDate is ',currentDate, ' bidEndDate is ',bidEndDate);
        insertFlag = insertFlag== true && currentDate < bidEndDate ? true: false;
        console.log('insertFlag for date compare is ',insertFlag);
        console.log('product detail is ',sellerProduct);
        console.log('bid is ',bidProduct);
        if(insertFlag){
            let dbresult = await productbuyermodel.insertMany(req);
            console.log('added bid req is ',req);
            return dbresult;
        }
        return {result: "Bid already available"};
    }

    async getBidByProductId(ProductId: string){
        console.log("getBidbypoductid"+ProductId);
        let dbresult: any[] = await productbuyermodel.find({'productId':ProductId});
       
        return dbresult;
    }

    async updateBidAmount(productId: string, emailId: string, newBidAmount: Number){
        let dbResult: any[] = await productbuyermodel.find({'productId':productId,'Email':emailId});
        if(dbResult.length > 0){
            console.log('dbResult ',dbResult);
            let bidProduct: any[] = await this.getBidByProductId(productId);
            let updateFlag = true;
           
            for(const item of bidProduct){
                console.log('item is ',item);
                if(emailId !== item?.Email){
                    console.log('req.Email == item?.Email ',emailId == item?.Email);
                    updateFlag  = false;
                    break;
                }
            }
            console.log('insertFlag for email compare is ',updateFlag);
            let currentDate = new Date();
            let sellerProduct;
        sellerProduct = await this.getProductById(productId);
        let bidEndDate = new Date(sellerProduct?.BidEndDate);
        console.log('currentDate is ',currentDate, ' bidEndDate is ',bidEndDate);
        updateFlag = updateFlag == true && currentDate < bidEndDate ? true: false;
       
        if(updateFlag){
            let updateResult = await productbuyermodel.updateOne({productId:productId , Email:emailId},{$set:{
                BidAmount: newBidAmount
            }});
            console.log('updatedResult is ',updateResult);
            return {result:'Updated successfully'};
        }
        }
        return {result: 'Unable to update the bid'};
    }

    async getBidsByProductId(productId: string){
        let sellerProduct;
        sellerProduct= await this.getProductById(productId);
        console.log('sellerProduct is ',sellerProduct);
        let bids: any[] = await productbuyermodel.find({'productId':productId});
        console.log('bidProduct is ',bids);
        let productBidObj = {
            ProductName: sellerProduct?.ProductName,
            ShortDescription:sellerProduct?.ShortDescription,
            DetailedDescription: sellerProduct?.DetailedDescription,
            Category: sellerProduct?.Category,
            StartingPrice: sellerProduct?.StartingPrice,
            BidEndDate: sellerProduct?.BidEndDate,
            sellerFirstName: sellerProduct?.FirstName,
            sellerLastName: sellerProduct?.LastName,
            sellerAdd: sellerProduct?.Address,
            sellerCity: sellerProduct?.City,
            sellerPin: sellerProduct?.Pin,
            sellerState: sellerProduct?.State,
            sellerEmail: sellerProduct?.Email,
            startingPrice: sellerProduct?.StartingPrice
        };
        let bidsArray: Number[] = [];
        for(const item of bids){
            console.log('bid item value is ',item);
            console.log('bidamount is ',item["BidAmount"]);
            bidsArray.push(item["BidAmount"]);
        }
        productBidObj["bids"] = bidsArray;
        return productBidObj;
    }
}
