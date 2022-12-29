"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const productsellerschema_1 = require("../db/productsellerschema");
const productbuyerschema_1 = require("../db/productbuyerschema");
let ProductsService = class ProductsService {
    constructor() {
        this.addProduct = async function (req) {
            var _a;
            let result;
            try {
                if (req.Email && !req.Email.includes('@')) {
                    result = { result: 'Email ID is invalid' };
                    throw new Error('Email ID is invalid');
                }
                let bidEndDate = new Date(req.BidEndDate);
                console.log('bidEndDate is ', bidEndDate);
                let currentDate = new Date();
                if (bidEndDate <= currentDate) {
                    result = { result: 'BidEndDate cannot be less than current date' };
                    throw new Error('BidEndDate cannot be less than current date');
                }
                let dbresult = await productsellerschema_1.productsellermodel.find();
                if (dbresult && dbresult.length > 0) {
                    req['productId'] = "p-" + dbresult.length;
                }
                else {
                    req['productId'] = "p-" + 0;
                }
                let product = new productsellerschema_1.productsellermodel(req);
                console.log("add prod" + req);
                let dbResult = await product.save();
                if (dbResult !== undefined) {
                    result = { result: 'Product Added Successfully' };
                }
                else {
                    result = { result: 'Failed to add Product' };
                }
            }
            catch (error) {
                console.log('error is ', error);
                result = { result: result ? result : ((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message) ? error.data.message : (error === null || error === void 0 ? void 0 : error.Error) ? error.Error : 'error occured' };
            }
            finally {
                console.log('final result is', result);
                return result;
            }
        };
        this.getProductByName = async function (productname) {
            let product = new productsellerschema_1.productsellermodel();
            let dbresult = await productsellerschema_1.productsellermodel.findOne({ 'ProductName': productname });
            console.log('getProduct data::', dbresult);
            return dbresult;
        };
        this.deleteProductById = async function (productId) {
            let sellerProduct = await this.getProductById(productId);
            console.log('seller product is ', sellerProduct);
            let deleteFlag = false;
            if (sellerProduct) {
                let bidEndDate = new Date(sellerProduct.BidEndDate);
                let currentDate = new Date();
                console.log('bidEndDate ', bidEndDate, ' currentDate ', currentDate);
                deleteFlag = bidEndDate < currentDate ? false : true;
            }
            console.log('deleteFlag if bidEndDate expired ', deleteFlag);
            let bidProduct = await this.getBidByProductId(productId);
            console.log('bidProduct is ', bidProduct);
            if (bidProduct && bidProduct.length > 0) {
                deleteFlag = false;
                console.log('deleteFlag if atleast one bid exist ', deleteFlag);
            }
            if (deleteFlag) {
                return await productsellerschema_1.productsellermodel.deleteOne({ "productId": productId });
            }
            return { result: "Product Cannot be deleted. Either has atleast one bid or the BidEndDate is expired" };
        };
        this.getAllProducts = async function () {
            let dbresult = await productsellerschema_1.productsellermodel.find();
            console.log('getProduct data::', dbresult);
            return dbresult;
        };
        this.getAllBids = async function () {
            let dbresult = await productbuyerschema_1.productbuyermodel.find();
            console.log('getProduct data::', dbresult);
            return dbresult;
        };
    }
    async getProductById(productId) {
        let dbresult = await productsellerschema_1.productsellermodel.find({ 'productId': productId });
        return dbresult[0];
    }
    async placeBid(req) {
        let sellerProduct;
        sellerProduct = await this.getProductById(req.productId);
        if (sellerProduct == null || sellerProduct == undefined) {
            return { result: 'Invalid Product' };
        }
        let bidProduct = await this.getBidByProductId(req.productId);
        let insertFlag = true;
        console.log('product retrieved is ', sellerProduct);
        console.log('bid retrieved is ', bidProduct);
        for (const item of bidProduct) {
            console.log('item is ', item);
            if (req.Email == (item === null || item === void 0 ? void 0 : item.Email)) {
                console.log('req.Email == item?.Email ', req.Email == (item === null || item === void 0 ? void 0 : item.Email));
                insertFlag = false;
                break;
            }
        }
        console.log('insertFlag for email compare is ', insertFlag);
        let currentDate = new Date();
        let bidEndDate = new Date(sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.BidEndDate);
        console.log('currentDate is ', currentDate, ' bidEndDate is ', bidEndDate);
        insertFlag = insertFlag == true && currentDate < bidEndDate ? true : false;
        console.log('insertFlag for date compare is ', insertFlag);
        console.log('product detail is ', sellerProduct);
        console.log('bid is ', bidProduct);
        if (insertFlag) {
            let dbresult = await productbuyerschema_1.productbuyermodel.insertMany(req);
            console.log('added bid req is ', req);
            return dbresult;
        }
        return { result: "Bid already available" };
    }
    async getBidByProductId(ProductId) {
        console.log("getBidbypoductid" + ProductId);
        let dbresult = await productbuyerschema_1.productbuyermodel.find({ 'productId': ProductId });
        return dbresult;
    }
    async updateBidAmount(productId, emailId, newBidAmount) {
        let dbResult = await productbuyerschema_1.productbuyermodel.find({ 'productId': productId, 'Email': emailId });
        if (dbResult.length > 0) {
            console.log('dbResult ', dbResult);
            let bidProduct = await this.getBidByProductId(productId);
            let updateFlag = true;
            for (const item of bidProduct) {
                console.log('item is ', item);
                if (emailId !== (item === null || item === void 0 ? void 0 : item.Email)) {
                    console.log('req.Email == item?.Email ', emailId == (item === null || item === void 0 ? void 0 : item.Email));
                    updateFlag = false;
                    break;
                }
            }
            console.log('insertFlag for email compare is ', updateFlag);
            let currentDate = new Date();
            let sellerProduct;
            sellerProduct = await this.getProductById(productId);
            let bidEndDate = new Date(sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.BidEndDate);
            console.log('currentDate is ', currentDate, ' bidEndDate is ', bidEndDate);
            updateFlag = updateFlag == true && currentDate < bidEndDate ? true : false;
            if (updateFlag) {
                let updateResult = await productbuyerschema_1.productbuyermodel.updateOne({ productId: productId, Email: emailId }, { $set: {
                        BidAmount: newBidAmount
                    } });
                console.log('updatedResult is ', updateResult);
                return { result: 'Updated successfully' };
            }
        }
        return { result: 'Unable to update the bid' };
    }
    async getBidsByProductId(productId) {
        let sellerProduct;
        sellerProduct = await this.getProductById(productId);
        console.log('sellerProduct is ', sellerProduct);
        let bids = await productbuyerschema_1.productbuyermodel.find({ 'productId': productId });
        console.log('bidProduct is ', bids);
        let productBidObj = {
            ProductName: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.ProductName,
            ShortDescription: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.ShortDescription,
            DetailedDescription: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.DetailedDescription,
            Category: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.Category,
            StartingPrice: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.StartingPrice,
            BidEndDate: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.BidEndDate,
            sellerFirstName: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.FirstName,
            sellerLastName: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.LastName,
            sellerAdd: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.Address,
            sellerCity: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.City,
            sellerPin: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.Pin,
            sellerState: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.State,
            sellerEmail: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.Email,
            startingPrice: sellerProduct === null || sellerProduct === void 0 ? void 0 : sellerProduct.StartingPrice
        };
        let bidsArray = [];
        for (const item of bids) {
            console.log('bid item value is ', item);
            console.log('bidamount is ', item["BidAmount"]);
            bidsArray.push(item["BidAmount"]);
        }
        productBidObj["bids"] = bidsArray;
        return productBidObj;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map