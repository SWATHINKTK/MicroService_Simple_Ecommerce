import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';

const ampqUrl = 'amqp://localhost:5672'; 
const QUEUE_NAME = 'hello';

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

export { rabbitMQConnect };