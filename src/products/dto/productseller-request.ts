import { ApiProperty } from '@nestjs/swagger';
import { Min, Max, IsString, IsNumber, IsDate, Length } from 'class-validator';
export class productSellerRequest {
    
    @ApiProperty()
    @IsString()
    @Min(5)
    @Max(30)
    ProductName: string;

    @ApiProperty()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsString()
    ShortDescription: string;

    @ApiProperty()
    @IsString()
    DetailedDescription: string;
    
    @ApiProperty()
    @IsString()
    @Min(5)
    @Max(30)
    FirstName: string;

    @ApiProperty()
    @IsString()
    @Min(5)
    @Max(30)
    LastName: string;

    @ApiProperty()
    Category: productCategory;
    
    @IsNumber()
    @ApiProperty()
    StartingPrice: number;

    @IsString()
    @ApiProperty()
    BidEndDate: string;

    @IsString()
    @ApiProperty()
    Address: string;

    @IsString()
    @ApiProperty()
    City: string;

    @IsString()
    @ApiProperty()
    State: string;

    @IsString()
    @ApiProperty()
    Pin: string;

    @IsNumber()
    @Length(10)
    @ApiProperty()
    Phone: number;

    @IsString()
    @ApiProperty()
    Email: string;
}

enum productCategory {
    ORNAMENT= 'Ornament',
    SCULPTURE= 'Sculpture',
    PAINTING = 'Painting'
}