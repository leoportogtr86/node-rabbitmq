const amqp = require("amqplib/callback_api");

const RABBITMQ_URL = "amqp://localhost";

const proccessOrder = () => {
    amqp.connect((err0, conn) => {
        if (err0) {
            throw err0;
        }

        conn.createChannel((err1, channel) => {
            if (err1) {
                throw err1;
            }

            const queue = "orders";

            channel.assertQueue(queue, {
                durable: true
            });

            channel.consume(queue, (msg) => {
                if (msg) {
                    const order = JSON.parse(msg.content.toString());
                    console.log("Recebendo a ordem: ", order);
                    console.log("Processando a ordem: ", order);

                    channel.ack(msg);
                }
            }, {
                noAck: false
            })
        })
    })
}

proccessOrder();