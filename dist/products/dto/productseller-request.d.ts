export declare class productSellerRequest {
    ProductName: string;
    productId: string;
    ShortDescription: string;
    DetailedDescription: string;
    FirstName: string;
    LastName: string;
    Category: productCategory;
    StartingPrice: number;
    BidEndDate: string;
    Address: string;
    City: string;
    State: string;
    Pin: string;
    Phone: number;
    Email: string;
}
declare enum productCategory {
    ORNAMENT = "Ornament",
    SCULPTURE = "Sculpture",
    PAINTING = "Painting"
}
export {};
