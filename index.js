const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const bot = new Discord.Client();
const mysql = require('mysql');
const token = 'NDYwNTY4NTE0NjU5NjE0NzMx.DhGpiQ.nZMgWYAbuMrtDlhl_SoqQM6R86A';
const server_id = '401424715954126858';
const spam_channel = '401428462671364097';
const info_channel = '407592712963883008';
const cmd_channel = '447698728770338816';

function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}
var servers = {};

  bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('prezydenta', { type: 'LISTENING' });
});

  bot.on('guildMemberAdd', member => {
      var role = member.guild.roles.find('name', 'not registered');
    member.addRole(role).catch(console.error);
    let guild = bot.guilds.get(server_id);
    if(guild) {
        let channel = guild.channels.get(info_channel);
        if(channel)
channel.send(`Nowy wariat na konferencji, ${member}.`);
//member.send(`Siema ${member}. Zajebiście, że wpadłeś. Wpisz swój charakter do chartu. Wypełnij krótki formularz, link do niego masz poniżej. Wpisz się jako Member/nomad. Gdy awansujesz w przyszłości, zostaniesz zaakceptowany i twój charakter pojawi się na stronie głównej. Piona, miłej gry!
//http://mobshitters.5v.pl/panel/add`);
}
});
bot.on('guildMemberRemove', member => {
    let guild = bot.guilds.get(server_id);
    if(guild) {
        let channel = guild.channels.get(info_channel);
        if(channel)
            channel.send("Żegnamy " + member.displayName + ".");
}
});

bot.on('message', async message => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === '/say') {
        if (message.channel.id === cmd_channel) {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            let botmessage = args.join(" ");
            message.delete().catch();
            var channel = bot.channels.get(spam_channel);
            channel.send(botmessage);
            
        }
        return;
    }
}
if(cmd === '/info') {
    if (message.channel.id === cmd_channel) {
    if(message.member.hasPermission("MANAGE_MESSAGES")) {
        let botmessage = args.join(" ");
        message.delete().catch();
        var channel = bot.channels.get(info_channel);
        channel.send(botmessage);
        
    }
    return;
}
}

if(cmd === '/play') {
    if (message.channel.id === cmd_channel) {
    if(!args[0]) {
        message.delete().catch();
        return;
    }
    if(!message.member.voiceChannel) {
        message.member.send("Musisz być na kanale głosowym.");
        message.delete().catch();
        return;
    }
    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    };
      var server = servers[message.guild.id];

    server.queue.push(args[0]);

      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
            message.delete().catch();
      });
    }
}

    if(cmd === '/skip') {
        if (message.channel.id === cmd_channel) {
        var server = servers[message.guild.id];
        message.delete().catch();
        if(server.dispatcher) server.dispatcher.end();
        }
    }
    if(cmd === '/stop') {
        if (message.channel.id === cmd_channel) {
            var server = servers[message.guild.id];
            message.delete().catch();
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            }
        }
    if(cmd === '/cmds') {
        if (message.channel.id === cmd_channel) {
            if(message.member.hasPermission("MANAGE_MESSAGES")) {
                let botmessage = args.join(" ");
                message.delete().catch();
                message.channel.send('```KOMENDY BOTA:\n/say [tekst] - pisanie na spamowej\n/info [tekst] - pisanie na informacyjnej``````KOMENDY MUZYCZNE:\n/play [youtube url] - można dodać kilka piosenek pod rząd\n/skip - pominięcie utworu i odtwarzanie następnego w kolejce\n/stop - zatrzymanie muzyki i kick bota z kanału```'); 
            }
            return;
        }
            }
  });

bot.login(token);
