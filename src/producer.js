const amqp = require("amqplib/callback_api");

const RABBITMQ_URL = "amqp://localhost";

const sendOrder = (order) => {
    amqp.connect(RABBITMQ_URL, (err1, conn) => {
        if (err1) {
            throw err1;
        }

        conn.createChannel((err1, channel) => {
            if (err1) {
                throw err1;
            }

            const queue = "orders";
            const msg = JSON.stringify(order);

            channel.assertQueue(queue, {
                durable: true
            });

            channel.sendToQueue(queue, Buffer.from(msg), {
                persistent: true
            })

            console.log("Enviando msg: ", msg);
        })

        setTimeout(() => {
            conn.close();
        }, 500);
    })
}

sendOrder({orderId: 3, produto: "Cadeira gamer", quantidade: 10});