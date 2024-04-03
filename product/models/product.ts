import mongoose from 'mongoose';

// interface to define the new user added properties
interface ProductAttr{
    productName:string,
    productDescription:string,
    quantity:number,
    price:number,
    image:string
}

// interface to describe the properties of usermodel
interface productModel extends mongoose.Model<ProductDocument> {
    build(attr:ProductAttr):ProductDocument
}


// Interface for userDocument
export interface ProductDocument extends mongoose.Document {
    productName:string,
    productDescription:string,
    quantity:number,
    price:number,
    image:string
}

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        require:true
    },
    productDescription : {
        type:String,
        require:true
    },
    quantity: {
        type:Number,
        require:true
    },
    price: {
        type:Number,
        require:true
    },
    image: {
        type:String,
        require:true
    },
},{timestamps:true});

productSchema.statics.build = (attr:ProductAttr) => {
    return new Product(attr);
} 






const Product = mongoose.model<ProductDocument, productModel>('product',productSchema);

export { Product };