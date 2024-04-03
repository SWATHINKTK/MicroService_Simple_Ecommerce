import { Request, Response } from "express";
import { Order } from "../model/order"; 

const viewOrders = async (req: Request, res: Response) => {
    const email = req.query.email as string;
    const orders = await Order.find({ username: email });
    res.json({orders:orders});
};

export {viewOrders};
