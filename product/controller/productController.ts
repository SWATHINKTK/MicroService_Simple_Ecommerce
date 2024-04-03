import express, { NextFunction, Request, Response } from "express";
import { Product } from "../models/product";
import { rabbitMQConnect } from "../config/rabbitmq";
import { ConsumeMessage } from "amqplib";




const addProduct = async(req: Request, res: Response) => {
  try {
    const { productName, productDescription, quantity, price, image } = req.body;
    if(!(productName && productDescription && quantity && price && image)){
        res.status(404).send([{
            message:'must required all fields.'
        }])
    }

    const product = Product.build({productName,productDescription,quantity,price,image});
    await product.save();
    res.status(200).send({message:'Product Added Successful.',product});

  } catch (error) {
    console.log(error)
  }
};

const getProducts = async(req: Request, res: Response) => {
  try {
    console.log(req.cookies)
    const products = await Product.find({});
    res.status(200).json({products:products})
  } catch (error) {
    
  }
}

const buyproduct = async(req: Request, res: Response) => {
  try {

    const { productId, email } = req.body;


    const product = await Product.findOne({_id:productId});

    const { connection, channel } = await rabbitMQConnect();

    await channel.assertQueue("ORDER");
    channel.sendToQueue("ORDER", Buffer.from(JSON.stringify({
      product,
      username:email
    })));

    let order;

    await channel.consume('PRODUCT',async(data:ConsumeMessage | null) => {
      if(data){
        console.log(data)
        let dataContent = data.content.toString();
        order = JSON.parse(dataContent)
        channel.ack(data);
      }
    })

    console.log('message is send',order)
    // Close the connection
    await channel.close();
    await connection.close();
    res.send(order);
  } catch (error) {
    console.log(error)
  }
}

export { addProduct,buyproduct,getProducts };
