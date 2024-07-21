A mensagem de erro "localhost recusou estabelecer ligação" indica que o servidor RabbitMQ não está aceitando conexões na
porta 15672. Isso pode ser devido a vários motivos, como o serviço RabbitMQ não estar em execução, problemas de firewall
ou configuração incorreta. Vamos verificar alguns pontos para resolver isso:

### Verificar o Serviço RabbitMQ

1. **Verificar se o RabbitMQ está em execução:**

   No PowerShell ou Prompt de Comando, execute:

   ```bash
   rabbitmqctl status
   ```

   Isso deve retornar o status do servidor RabbitMQ. Se o serviço não estiver em execução, você precisará iniciá-lo.

2. **Iniciar o Serviço RabbitMQ:**

   Se o RabbitMQ não estiver em execução, você pode iniciá-lo com o seguinte comando:

   ```bash
   rabbitmq-server
   ```

### Verificar o Plugin de Gerenciamento

3. **Certificar-se de que o Plugin de Gerenciamento está Habilitado:**

   Verifique novamente se o plugin de gerenciamento está habilitado:

   ```bash
   rabbitmq-plugins enable rabbitmq_management
   ```

### Verificar as Configurações de Firewall

4. **Verificar as Configurações de Firewall:**

   Certifique-se de que o firewall do Windows não está bloqueando a porta 15672. Você pode adicionar uma regra ao
   firewall para permitir conexões nessa porta:

    - Abra o **Painel de Controle** e vá para **Sistema e Segurança** > **Firewall do Windows Defender** > *
      *Configurações avançadas**.
    - Selecione **Regras de Entrada** e clique em **Nova Regra...**.
    - Escolha **Porta** e clique em **Avançar**.
    - Selecione **TCP** e especifique a porta **15672**.
    - Permita a conexão e escolha os perfis em que a regra se aplica.
    - Dê um nome à regra e clique em **Concluir**.

### Verificar os Logs do RabbitMQ

5. **Verificar os Logs do RabbitMQ:**

   Os logs do RabbitMQ podem fornecer informações úteis sobre o motivo pelo qual o servidor não está aceitando conexões.
   Verifique os logs em:

   ```
   C:\Users\<SeuUsuário>\AppData\Roaming\RabbitMQ\log
   ```

### Reiniciar o Serviço RabbitMQ

6. **Reiniciar o Serviço RabbitMQ:**

   Tente reiniciar o serviço RabbitMQ para garantir que todas as configurações sejam recarregadas corretamente:

   ```bash
   rabbitmq-service.bat stop
   rabbitmq-service.bat start
   ```

### Acessar o Painel de Gerenciamento

7. **Acessar o Painel de Gerenciamento:**

   Após verificar todos os pontos acima, tente acessar novamente a interface de gerenciamento no navegador:

   ```
   http://localhost:15672/
   ```

Se você seguir esses passos e ainda não conseguir acessar o painel de gerenciamento, forneça os logs do RabbitMQ para
uma análise mais detalhada.