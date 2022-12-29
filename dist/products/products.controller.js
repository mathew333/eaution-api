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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const productbuyer_request_1 = require("./dto/productbuyer-request");
const productseller_request_1 = require("./dto/productseller-request");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    constructor(productsSvc) {
        this.productsSvc = productsSvc;
    }
    async addProduct(req) {
        console.log('request body is%j', req);
        let result = await this.productsSvc.addProduct(req);
        return result;
    }
    getProduct(productname) {
        return this.productsSvc.getProductByName(productname);
    }
    deleteProduct(productId) {
        productId = 'p-' + productId;
        return this.productsSvc.deleteProductById(productId);
    }
    getAllProducts() {
        return this.productsSvc.getAllProducts();
    }
    placeBid(req) {
        return this.productsSvc.placeBid(req);
    }
    updateBid(body, productId, emailID, newBidAmount) {
        console.log('productId:', productId, '-emailId:', emailID, '-newBidAmount:', newBidAmount);
        return this.productsSvc.updateBidAmount(productId, emailID, newBidAmount);
    }
    getBidsByProduct(productId) {
        return this.productsSvc.getBidsByProductId(productId);
    }
    getAllBids() {
        return this.productsSvc.getAllBids();
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: Object,
        description: 'add the given product'
    }),
    (0, common_1.Post)('seller/add-product'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productseller_request_1.productSellerRequest]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addProduct", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: Object,
        description: 'get product for the given name'
    }),
    (0, common_1.Get)('seller/get-product'),
    __param(0, (0, common_1.Query)('productname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Delete)('seller/delete/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: Object,
        description: 'list all available products for bidding'
    }),
    (0, common_1.Get)('buyer/getallproducts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Post)('buyer/place-bid'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productbuyer_request_1.productBuyerRequest]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "placeBid", null);
__decorate([
    (0, common_1.Put)('buyer/update-bid/:productid/:email/:newbidamount'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('productid')),
    __param(2, (0, common_1.Param)('email')),
    __param(3, (0, common_1.Param)('newbidamount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateBid", null);
__decorate([
    (0, common_1.Get)('seller/show-bids/:productid'),
    __param(0, (0, common_1.Param)('productid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getBidsByProduct", null);
__decorate([
    (0, common_1.Get)('seller/show-bids'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getAllBids", null);
ProductsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map