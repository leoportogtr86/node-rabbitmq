### Passo a Passo: Produtor Node.js com RabbitMQ

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

3. **Criar a Função sendOrder:**

   ```javascript
   const sendOrder = (order) => {
   ```

   Esta função aceita um objeto `order` como argumento e será responsável por enviar a mensagem para o RabbitMQ.

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
   const msg = JSON.stringify(order);

   channel.assertQueue(queue, {
     durable: true,
   });
   ```

   Declara a fila `orders`. A opção `durable: true` garante que a fila sobreviva a reinicializações do servidor
   RabbitMQ. A mensagem é convertida em uma string JSON.

9. **Enviar a Mensagem para a Fila:**

   ```javascript
   channel.sendToQueue(queue, Buffer.from(msg), {
     persistent: true,
   });
   ```

   Envia a mensagem para a fila `orders`. A opção `persistent: true` garante que a mensagem será salva em disco,
   tornando-a mais resistente a falhas.

10. **Fechar a Conexão:**

    ```javascript
    console.log(" [x] Sent '%s'", msg);
    setTimeout(() => {
      connection.close();
    }, 500);
    ```

    Loga a mensagem enviada no console e fecha a conexão após 500 milissegundos para garantir que a mensagem tenha sido
    enviada antes da conexão ser fechada.

### Execução do Código

- **Salvar o Código:**
  Salve o código acima em um arquivo chamado `producer.js`.

- **Executar o Produtor:**
  No terminal, navegue até o diretório onde o arquivo `producer.js` está localizado e execute o comando:

  ```bash
  node producer.js
  ```

  Isso enviará um pedido de exemplo (`{ orderId: 1, product: 'Laptop', quantity: 1 }`) para a fila `orders` no RabbitMQ.

Esse guia passo a passo cobre a configuração e execução do produtor em Node.js para enviar mensagens ao RabbitMQ. Você
pode adaptar e expandir esse exemplo para suas necessidades específicas.