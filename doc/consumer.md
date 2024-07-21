### Passo a Passo: Consumidor Node.js com RabbitMQ

1. **Importar a Biblioteca amqplib:**

   ```javascript
   const amqp = require('amqplib/callback_api');
   ```

   A biblioteca `amqplib` é usada para se comunicar com o RabbitMQ. Estamos usando a versão que usa callbacks.

2. **Definir a URL de Conexão do RabbitMQ:**

   ```javascript
   const RABBITMQ_URL = 'amqp://localhost';
   ```

   Define a URL de conexão para o servidor RabbitMQ que está rodando localmente.

3. **Criar a Função processOrder:**

   ```javascript
   const processOrder = () => {
   ```

   Esta função será responsável por consumir mensagens da fila do RabbitMQ.

4. **Conectar ao RabbitMQ:**

   ```javascript
   amqp.connect(RABBITMQ_URL, (error0, connection) => {
   ```

   Inicia a conexão com o servidor RabbitMQ. Se houver um erro ao se conectar, ele será passado para o callback
   como `error0`.

5. **Tratamento de Erro na Conexão:**

   ```javascript
   if (error0) {
     throw error0;
   }
   ```

   Verifica se há um erro na conexão. Se houver, ele lança o erro e para a execução.

6. **Criar um Canal de Comunicação:**

   ```javascript
   connection.createChannel((error1, channel) => {
   ```

   Cria um canal de comunicação dentro da conexão RabbitMQ. Se houver um erro ao criar o canal, ele será passado
   como `error1`.

7. **Tratamento de Erro na Criação do Canal:**

   ```javascript
   if (error1) {
     throw error1;
   }
   ```

   Verifica se há um erro ao criar o canal. Se houver, ele lança o erro e para a execução.

8. **Declarar a Fila:**

   ```javascript
   const queue = 'orders';

   channel.assertQueue(queue, {
     durable: true,
   });
   ```

   Declara a fila `orders`. A opção `durable: true` garante que a fila sobreviva a reinicializações do servidor
   RabbitMQ.

9. **Consumir Mensagens da Fila:**

   ```javascript
   channel.consume(queue, (msg) => {
     if (msg !== null) {
       const order = JSON.parse(msg.content.toString());
       console.log(" [x] Received '%s'", order);
       // Processar o pedido aqui
       console.log("Processing order: ", order);

       // Acknowledge que a mensagem foi processada
       channel.ack(msg);
     }
   }, {
     noAck: false,
   });
   ```

   Define um consumidor para a fila `orders`. Quando uma mensagem é recebida, ela é convertida de volta para um objeto
   JSON e processada. A opção `noAck: false` indica que a mensagem deve ser reconhecida manualmente (`channel.ack(msg)`)
   para confirmar que foi processada.

10. **Iniciar o Consumidor:**

    ```javascript
    processOrder();
    ```

    Chama a função `processOrder` para iniciar o consumidor e começar a receber mensagens da fila.

### Execução do Código

- **Salvar o Código:**
  Salve o código acima em um arquivo chamado `consumer.js`.

- **Executar o Consumidor:**
  No terminal, navegue até o diretório onde o arquivo `consumer.js` está localizado e execute o comando:

  ```bash
  node consumer.js
  ```

  Isso fará com que o consumidor comece a receber e processar mensagens da fila `orders` no RabbitMQ.

---

### Código Completo do Consumidor

```javascript
const amqp = require('amqplib/callback_api');

// URL de conexão do RabbitMQ
const RABBITMQ_URL = 'amqp://localhost';

// Função para consumir mensagens
const processOrder = () => {
    amqp.connect(RABBITMQ_URL, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            const queue = 'orders';

            channel.assertQueue(queue, {
                durable: true,
            });

            channel.consume(queue, (msg) => {
                if (msg !== null) {
                    const order = JSON.parse(msg.content.toString());
                    console.log(" [x] Received '%s'", order);
                    // Processar o pedido aqui
                    console.log("Processing order: ", order);

                    // Acknowledge que a mensagem foi processada
                    channel.ack(msg);
                }
            }, {
                noAck: false,
            });
        });
    });
};

// Iniciar o consumidor
processOrder();
```

Seguindo estes passos, você terá configurado e executado o consumidor em Node.js para receber e processar mensagens da
fila `orders` no RabbitMQ. Você pode adaptar e expandir esse exemplo para atender às necessidades específicas da sua
aplicação.