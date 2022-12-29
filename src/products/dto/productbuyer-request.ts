import { ApiProperty } from '@nestjs/swagger';
import { Min, Max, IsString, IsNumber, IsDate, Length } from 'class-validator';
export class productBuyerRequest {
    
    @ApiProperty()
    @IsString()
    @Min(5)
    @Max(30)
    FirstName: string;

    @ApiProperty()
    @IsString()
    @Min(3)
    @Max(25)
    LastName: string;

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

    @IsString()
    @ApiProperty()
    productId: string;

    @IsNumber()
    @ApiProperty()
    BidAmount: number;
}