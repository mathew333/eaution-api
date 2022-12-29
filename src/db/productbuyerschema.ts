import mongoose from "mongoose";
import {dbConnection} from './db';

let productbuyerschema = new mongoose.Schema({
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
    },
    productId: {
        type: String,
        required: true
    },
    BidAmount: {
        type: Number,
        required: true
    },
});

export let productbuyermodel = mongoose.model('productbuyer',productbuyerschema,'productbuyer');
dbConnection();