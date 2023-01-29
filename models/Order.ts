import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrder } from 'interfaces';


const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        _id     : { type: Schema.Types.ObjectId, ref: 'Product', required: true },     
        title   : { type: String, required: true },   
        size    : { type: String, required: true },    
        quantity: { type: Number, required: true },
        slug    : { type: String, required: true },    
        image   : { type: String, required: true },   
        price   : { type: Number, required: true }   
    }],
    shippingAddress: {
        firstName   : { type: String, required: true },
        lastName    : { type: String, required: true },
        address     : { type: String, required: true },
        address2    : { type: String  },
        zip         : { type: String, required: true },
        city        : { type: String, required: true },
        country     : { type: String, required: true },
        phone       : { type: String, required: true },
    },
    numberOfItems   : { type: Number, require: true }, 
    subTotal        : { type: Number, require: true }, 
    tax             : { type: Number, require: true }, 
    total           : { type: Number, require: true }, 
    isPaid          : { type: Boolean, require: true, default: false }, 
    paidAt          : { type: String },
    transactionId   : { type: String }
    
}, {
    timestamps: true
});

const Order:Model<IOrder> = mongoose.models.User || model( 'User', orderSchema );

export default Order;