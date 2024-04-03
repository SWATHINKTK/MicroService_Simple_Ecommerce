import { viewOrders } from '../controller/orderController';
import express from 'express';
const orderRouter = express();


orderRouter.get('/vieworders',viewOrders)

export { orderRouter };