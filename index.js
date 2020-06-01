const Discord = require('discord.js');
const { de, d, ds, d9, d8, token } = require('./config.json');
const client = new Discord.Client();
client.once('ready', () => {
	console.log('Estou ligado!');
});

client.on('message', message => {

    var MensagemNoDiscord;
    if(message.content.startsWith(ds))
    {
        MensagemNoDiscord = Resolver(1, true, 10);
    }
    if(message.content.startsWith(de))
    {
        var res = message.content.split(" ");
        var QuantidadeDeDados = (res[1]);
        if(isNaN(QuantidadeDeDados))
        {
            message.channel.send("Não é um número");
        }
        else
        {
            MensagemNoDiscord = Resolver(QuantidadeDeDados, false, 10);
        }
    }
    if(message.content.startsWith(d))
    {
        var res = message.content.split(" ");
        var QuantidadeDeDados = (res[1]);
        if(isNaN(QuantidadeDeDados))
        {
            message.channel.send("Não é um número");
        }
        else
        {
            MensagemNoDiscord = Resolver(QuantidadeDeDados, false, -1);
        }
    }
    if(message.content.startsWith(d9))
    {
        var res = message.content.split(" ");
        var QuantidadeDeDados = (res[1]);
        if(isNaN(QuantidadeDeDados))
        {
            message.channel.send("Não é um número");
        }
        else
        {
            MensagemNoDiscord = Resolver(QuantidadeDeDados, false, 9);
        }
    }
    if(message.content.startsWith(d8))
    {
        var res = message.content.split(" ");
        var QuantidadeDeDados = (res[1]);
        if(isNaN(QuantidadeDeDados))
        {
            message.channel.send("Não é um número");
        }
        else
        {
            MensagemNoDiscord = Resolver(QuantidadeDeDados, false, 8);
        }
    }

    
    if(MensagemNoDiscord != null)
    {
        message.channel.send(MensagemNoDiscord);
    }
    
})

client.login(token);

function Resolver(QuantidadeDeDados, isDadoDeSorte, Explosao)
{
    var SucessosObtidos = 0;
    var Rolagens = [];
    var Explosoes = [];

    SucessosObtidos = RolarDado(QuantidadeDeDados, Rolagens, Explosoes, false, isDadoDeSorte, Explosao);

    var RolagensNaTela = Rolagens.join(", ");
    var ExplosoesNaTela;
    if(Explosoes.length <= 0)
    {
        Explosoes.push("-");
        ExplosoesNaTela = Explosoes;
    }
    else
    {
        ExplosoesNaTela = Explosoes.join(", ");
    }
    var SucessoMensagem;
    if(SucessosObtidos == 1)
    {
        SucessoMensagem = " sucesso foi obtido";
    }
    else
    {
        SucessoMensagem = " sucessos foram obtidos";
    }
    var MensagemDado;
    if(QuantidadeDeDados == 1)
    {
        MensagemDado = " dado";
    }
    else
    {
        MensagemDado = " dados";
    }
    var MensagemResultado;
    if(isDadoDeSorte && SucessosObtidos == 0 && Rolagens[0] == 1)
    {
        MensagemResultado = "Falha dramática";
    }
    else
    {
        MensagemResultado = SucessosObtidos + SucessoMensagem;
    }
    
    const mensagemEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Resultado: ' + MensagemResultado)
    .setThumbnail('https://www.rederpg.com.br/wp/wp-content/uploads/2015/12/CofD-Circle-hi-res.png')
    .addFields(
        { name: 'Parada', value: QuantidadeDeDados + MensagemDado, inline: true},
        { name: 'Rolagens', value: RolagensNaTela, inline: true },
        { name: 'Explosões', value: ExplosoesNaTela, inline: true }
    )
    
    return mensagemEmbed;
}

function RolarDado(QuantidadeDeDados, Rolagens, Explosoes, isExplosao, isDadoDeSorte, Explosao)
{
    var QuantasExplosoes = 0;
    var SucessosObtidos = 0;
    
    for (var i = 0; i < QuantidadeDeDados; i++)
    {
        var rolagem = Math.floor((Math.random() * 10) + 1);

        if(isDadoDeSorte)
        {
            if(rolagem == 10)
            {
                SucessosObtidos++;
            }
        }
        else
        {
            if(rolagem >= 8)
            {
                SucessosObtidos++;
            }
        }
        
        if((rolagem == 10 && !isDadoDeSorte ) || (rolagem >= 9 && Explosao == 9) || (rolagem >= 8 && Explosao == 8))
        {
            QuantasExplosoes++;
        }
        if(isExplosao)
        {
            Explosoes.push(rolagem);
        }
        else
        {
            Rolagens.push(rolagem);
        }
    }   
    if(QuantasExplosoes > 0)
    {        
        SucessosObtidos += RolarDado(QuantasExplosoes, Rolagens, Explosoes, true, false, Explosao);
    }
    return SucessosObtidos;
}

function CompareNumbers(a, b)
{
    return a - b;
}