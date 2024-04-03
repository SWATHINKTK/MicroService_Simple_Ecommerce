import amqp, { Channel, Connection } from 'amqplib';

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

export { rabbitMQConnect };