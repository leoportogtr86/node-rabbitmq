Sim, o RabbitMQ possui uma interface de gerenciamento baseada na web que permite visualizar e gerenciar filas,
exchanges, bindings, entre outros recursos. Vamos ver como habilitar e acessar essa interface.

### Habilitar o Plugin de Gerenciamento do RabbitMQ

1. **Habilitar o Plugin de Gerenciamento:**

   Primeiro, habilite o plugin de gerenciamento do RabbitMQ. No terminal, execute o seguinte comando:

   ```bash
   rabbitmq-plugins enable rabbitmq_management
   ```

2. **Verificar a Ativação do Plugin:**

   Depois de habilitar o plugin, você verá uma mensagem confirmando que o plugin foi ativado.

### Acessar a Interface de Gerenciamento

3. **Acessar o Painel de Gerenciamento:**

   Abra o seu navegador e vá para o seguinte URL:

   ```
   http://localhost:15672/
   ```

4. **Login na Interface de Gerenciamento:**

   Você será solicitado a fazer login. Por padrão, o RabbitMQ cria um usuário administrador chamado `guest` com a
   senha `guest`.

    - **Username:** guest
    - **Password:** guest

### Usando a Interface de Gerenciamento

Depois de fazer login, você terá acesso a várias funcionalidades através da interface de gerenciamento, incluindo:

- **Visão Geral (Overview):** Exibe informações gerais sobre o status do servidor RabbitMQ, incluindo o número de
  conexões, canais, exchanges e filas.
- **Filas (Queues):** Permite visualizar e gerenciar filas, incluindo a criação, exclusão e inspeção de mensagens.
- **Exchanges:** Permite visualizar e gerenciar exchanges, incluindo a criação e configuração de roteamento.
- **Bindings:** Permite visualizar e gerenciar bindings entre exchanges e filas.
- **Conexões:** Exibe informações sobre conexões de clientes ativas.
- **Administração:** Permite gerenciar usuários, permissões e políticas.

### Configurações Adicionais

Se desejar, você pode criar novos usuários com diferentes níveis de permissões para acessar o painel de gerenciamento.
Para isso, vá até a aba **Admin** e clique em **Add user** para adicionar novos usuários. Você pode definir as
permissões adequadas para cada usuário de acordo com suas necessidades.

### Exemplo de Código para Testar a Interface de Gerenciamento

Para verificar se tudo está funcionando corretamente, você pode usar o exemplo de código do produtor e consumidor que
criamos anteriormente. Quando você enviar uma mensagem usando o produtor e consumir essa mensagem usando o consumidor,
você verá as mudanças refletidas na interface de gerenciamento do RabbitMQ.

### Conclusão

A interface de gerenciamento do RabbitMQ é uma ferramenta poderosa para monitorar e gerenciar suas filas, exchanges e
mensagens. Ela fornece uma visão abrangente do estado do seu servidor RabbitMQ e permite realizar operações
administrativas com facilidade.