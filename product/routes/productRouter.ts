import express,{Request, Response} from 'express';
import { addProduct, buyproduct, getProducts } from '../controller/productController';
const productRouter = express();

productRouter.post("/addproduct",addProduct);
productRouter.get('/viewproduct',getProducts)
productRouter.post('/buyproduct',buyproduct)

export { productRouter }