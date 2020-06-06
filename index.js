const Discord = require('discord.js');
const { de, dn, ds, d9, d8, token } = require('./config.json');
const client = new Discord.Client();
client.once('ready', () => {
	console.log('Estou ligado!');
});
const PossiveisInputs = 
{
    QuantidadeDeDados:"",
    MensagemValida(message)
    {
        return (message.content.startsWith(ds) || message.content.startsWith(de) || message.content.startsWith(dn) || message.content.startsWith(d9) || message.content.startsWith(d8));
    },
    PossuiDados(message, split)
    {
        var res = message.content.split(" ");
        QuantidadeDeDados = (res[1]);
        QuantidadeDeDados = parseInt(QuantidadeDeDados);
        if(!Number.isInteger(QuantidadeDeDados) && split != "ds")
        {
            return false;
        }
        else
        {
            return true;
        }
    },
    ds(message)
    {
        return RolarDados(1, true, 10);
    },
    de(message)
    {
        return RolarDados(QuantidadeDeDados, false, 10);        
    },
    dn(message)
    {
        return RolarDados(QuantidadeDeDados, false, -1);        
    },
    d9(message)
    {
        return RolarDados(QuantidadeDeDados, false, 9);
    },
    d8(message)
    {
        return RolarDados(QuantidadeDeDados, false, 8);
    }
}

function CriarMensagem(message)
{
    var split = message.content.substring(1, 3);

    if(split < 2 || split == "")
    {
        return "Não é um comando válido";
    }
    
    if(PossiveisInputs.PossuiDados(message, split))
    {
        const GetMensagem = PossiveisInputs[split];
        return GetMensagem(message);
    }
    return "Não é um comando válido";
}

client.on('message', message => {

    var MensagemNoDiscord;
    if(PossiveisInputs.MensagemValida(message))
    {
        MensagemNoDiscord = CriarMensagem(message);        
    }
    if(MensagemNoDiscord != null)
    {
        message.channel.send(MensagemNoDiscord);
    }
})

client.login(token);

function RolarDados(QuantidadeDeDados, isDadoDeSorte, Explosao)
{
    var SucessosObtidos = 0;
    var QuantasExplosoes = 0;
    var Rolagens = [];
    var Explosoes = [];

    for (var i = 0; i < QuantidadeDeDados; i++)
    {
        var rolagem = Math.floor((Math.random() * 10) + 1);

        if(isDadoDeSorte && rolagem == 10)
        {
            SucessosObtidos++;            
        }
        else
        {
            if(!isDadoDeSorte && rolagem >= 8)
            {
                SucessosObtidos++;
            }
        }
        
        if((Explosao == 10 && rolagem == 10) || (Explosao == 9 && rolagem >= 9) || (Explosao == 8 && rolagem >= 8))
        {
            QuantasExplosoes++;
        }

        Rolagens.push(rolagem);
    }

    for(i = 0; i < QuantasExplosoes; i++)
    {
        var rolagemExplosao = Math.floor((Math.random() * 10) + 1);

        if(isDadoDeSorte && rolagemExplosao == 10)
        {
            SucessosObtidos++;            
        }
        else
        {
            if(rolagemExplosao >= 8)
            {
                SucessosObtidos++;
            }
        }
        
        if((Explosao == 10 && rolagemExplosao == 10) || (Explosao == 9 && rolagemExplosao >= 9) || (Explosao == 8 && rolagemExplosao >= 8))
        {
            QuantasExplosoes++;
        }

        Explosoes.push(rolagemExplosao);
    }

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

function CompareNumbers(a, b)
{
    return a - b;
}