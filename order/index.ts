import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';
import { Order, OrderDoc } from './model/order';
import { orderRouter } from './router/orderRouter';


const app = express();
const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/micro")
        .then(() => console.log('DB Connection Successful.'))
        .catch((error) =>  console.log("Connection Error", error))
}
connectDB();
app.use(cors());


const ampqUrl = 'amqp://localhost:5672'; 

async function rabbitMQConnect(): Promise<{ connection: Connection, channel: Channel }> {
    try {
        const connection = await amqp.connect(ampqUrl);
        const channel = await connection.createChannel();

        return { connection, channel };
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        throw error;
    }
}

async function consumeMessage(channel: Channel): Promise<void> {
    try {

        console.log('Waiting for messages in the queue...');

        channel.consume("ORDER", async(msg: ConsumeMessage | null) => {
            if (msg) {

                const msgContent = msg.content.toString()

                const { product,username } = JSON.parse(msgContent);
                const ordered:OrderDoc = await Order.addData({product,username})
                console.log(`Received message: ${msg.content.toString()}`);
                channel.ack(msg); 

                await channel.assertQueue("PRODUCT");
                channel.sendToQueue('PRODUCT',Buffer.from(JSON.stringify(ordered)))
                console.log('Order is done',ordered)
            }
        });
    } catch (error) {
        console.error('Error consuming message:', error);
        throw error;
    }
}

async function main() {
    const { connection, channel } = await rabbitMQConnect();
    await consumeMessage(channel);
}

main().catch(error => {
    console.error('An error occurred:', error);
});



app.use('/api',orderRouter)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
