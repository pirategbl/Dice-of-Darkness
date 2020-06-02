# Dice of Darkness, um bot de rolagem de dados para Chronicles of Darkness

Dice of Darkness é um bot que foi criado para facilitar a rolagem de dados em sessões dos jogos da linha Chronicles of Darkness da Onyx Path Publishing. O jogador digita o comando e quantidade de dados e o bot retorna os valores rolados, as explosões ocorridas e quantos sucessos foram obtidos com a rolagem

## Comandos aceitos

- !de X -> Rolagem comum onde ocorre explosão do 10, sendo X a quantidade de dados a serem jogados.

- !dne X -> X representa a quantidade de dados, contudo não há a explosão do 10.

- !ds -> Um dado de sorte é rolado.

- !d9 X -> Uma quantidade X de dados é rolada utilizando da explosão do 9.

- !d8 X -> Uma quantidade X de dados é rolada utilizando da explosão do 8.

## Exemplo de funcionamento

![](images/sample.png)

## Tutorial de hospedagem

É meio contraintuitivo, mas como não tenho possibilidades de hospedar o bot em um servidor, cada um que queira fazer o uso dele assim o deverá fazer:

#### Passo 1:

Instale o Node.Js encontrado no link: https://nodejs.org/pt-br/

#### Passo 2:

- Entre em https://github.com/seraph73/Dice-of-Darkness e clique em Clone or Download. Faça o download como ZIP.

- Extraia a pasta em um local de fácil acesso.

- Abra o arquivo config.json com o bloco de notas e o deixe aberto.


#### Passo 3:

- Entre no site discord.com/developers

- Se não estiver logado em seu discord, faça isso

- Clique em New Application e dê o nome que você quiser para a aplicação. Clique em Create.

- Onde está escrito Client Id, clique no botão Copy.

- No link a frente, no lugar onde está escrito INSIRA_AQUI, cole o Client ID. Este será o link para convidar o bot para o servidor. https://discordapp.com/oauth2/authorize?client_id=INSIRA_AQUI&scope=bot&permissions=0

- Clique em Bot. Clique em Add Bot. Clique em Yes, do it. Dê um username para o bot e coloque um ícone a sua escolha.

- Onde está escrito Token, clique em Copy

- No arquivo config.json que está aberto, procure onde está escrito token e, dentro das aspas, cole o token que você copiou. Salve o arquivo.

- Clique em Ligar Bot e já estará funcionando. Após o uso é só fechar a tela de comando.
