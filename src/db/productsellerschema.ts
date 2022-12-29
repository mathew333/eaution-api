import mongoose from "mongoose";
import {dbConnection} from './db';

let productsellerschema = new mongoose.Schema({
    ProductName: {
        type: String,
        min: 5,
        max: 30,
        required: true
    },
    productId: {
        type: String
    },
    Category : {
        type: String,
        enum: ['Ornament','Painting','Sculpture'],
        required: true
    },
    ShortDescription: {
        type: String,
        required: true
    },
    DetailedDescription: {
        type: String,
        required: true
    },
    StartingPrice: {
        type: Number,
        required: true
    },
    BidEndDate: {
        type: String,
        required: true
    },
    FirstName: {
        type: String,
        min: 5,
        max: 30,
        required: true
    },
    LastName: {
        type: String,
        min: 3,
        max: 25,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Pin: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    }
});

export let productsellermodel = mongoose.model('product',productsellerschema,'productseller');
dbConnection();