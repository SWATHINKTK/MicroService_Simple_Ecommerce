import mongoose, { Schema, Document, Model } from "mongoose";

interface Product {
    productName: string;
    productDescription: string;
    quantity: number;
    price: number;
    image: string;
}

interface OrderAttr {
    product: Product;
    username: string;
}

export interface OrderDoc extends Document {
    product: Product;
    username: string;
}

interface OrderModel extends Model<OrderDoc> {
    addData(order: OrderAttr): Promise<OrderDoc>;
}

const orderSchema: Schema = new Schema({
    product: {
        productName: {
            type: String,
            required: true
        },
        productDescription: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    username: {
        type: String,
        required: true
    }
});

orderSchema.statics.addData = async function (order: OrderAttr): Promise<OrderDoc> {
    const orderData = new this(order);
    const saveData = await orderData.save();
    return saveData;
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
