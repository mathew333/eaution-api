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
exports.productSellerRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class productSellerRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Min)(5),
    (0, class_validator_1.Max)(30),
    __metadata("design:type", String)
], productSellerRequest.prototype, "ProductName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], productSellerRequest.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], productSellerRequest.prototype, "ShortDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], productSellerRequest.prototype, "DetailedDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Min)(5),
    (0, class_validator_1.Max)(30),
    __metadata("design:type", String)
], productSellerRequest.prototype, "FirstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Min)(5),
    (0, class_validator_1.Max)(30),
    __metadata("design:type", String)
], productSellerRequest.prototype, "LastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], productSellerRequest.prototype, "Category", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], productSellerRequest.prototype, "StartingPrice", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], productSellerRequest.prototype, "BidEndDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], productSellerRequest.prototype, "Address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], productSellerRequest.prototype, "City", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], productSellerRequest.prototype, "State", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], productSellerRequest.prototype, "Pin", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Length)(10),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], productSellerRequest.prototype, "Phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], productSellerRequest.prototype, "Email", void 0);
exports.productSellerRequest = productSellerRequest;
var productCategory;
(function (productCategory) {
    productCategory["ORNAMENT"] = "Ornament";
    productCategory["SCULPTURE"] = "Sculpture";
    productCategory["PAINTING"] = "Painting";
})(productCategory || (productCategory = {}));
//# sourceMappingURL=productseller-request.js.map