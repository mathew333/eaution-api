import { productSellerRequest } from './dto/productseller-request';
import { productBuyerRequest } from './dto/productbuyer-request';
export declare class ProductsService {
    constructor();
    addProduct: (req: productSellerRequest) => Promise<any>;
    getProductByName: (productname: string) => Promise<any>;
    getProductById(productId: string): Promise<any>;
    deleteProductById: any;
    getAllProducts: () => Promise<any[]>;
    getAllBids: () => Promise<any[]>;
    placeBid(req: productBuyerRequest): Promise<any[] | {
        result: string;
    }>;
    getBidByProductId(ProductId: string): Promise<any[]>;
    updateBidAmount(productId: string, emailId: string, newBidAmount: Number): Promise<{
        result: string;
    }>;
    getBidsByProductId(productId: string): Promise<{
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
}
