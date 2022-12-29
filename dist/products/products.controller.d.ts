import { productBuyerRequest } from './dto/productbuyer-request';
import { productSellerRequest } from './dto/productseller-request';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsSvc;
    constructor(productsSvc: ProductsService);
    addProduct(req: productSellerRequest): Promise<any>;
    getProduct(productname: string): Promise<any>;
    deleteProduct(productId: string): any;
    getAllProducts(): Promise<any[]>;
    placeBid(req: productBuyerRequest): Promise<any[] | {
        result: string;
    }>;
    updateBid(body: any, productId: any, emailID: any, newBidAmount: any): Promise<{
        result: string;
    }>;
    getBidsByProduct(productId: string): Promise<{
        ProductName: any;
        ShortDescription: any;
        DetailedDescription: any;
        Category: any;
        StartingPrice: any;
        BidEndDate: any;
        sellerFirstName: any;
        sellerLastName: any;
        sellerAdd: any;
        sellerCity: any;
        sellerPin: any;
        sellerState: any;
        sellerEmail: any;
        startingPrice: any;
    }>;
    getAllBids(): Promise<any[]>;
}
