const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NDI4MjA5NTEzOTc2Mjk5NTIx.DZvxow.yhNgrYpHmy9lb2cc2M2RUEpMSMM';
const server_id = '401424715954126858';
const spam_channel = '401428462671364097';
const info_channel = '407592712963883008';
const cmd_channel = '428256083690127371';

  bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('prezydenta', { type: 'LISTENING' });
    var channel = bot.channels.get(cmd_channel);
    channel.send('```KOMENDY:\n/say [tekst] - pisanie na spamowej\n/info [tekst] - pisanie na informacyjnej```');
});

  bot.on('guildMemberAdd', member => {
    let guild = bot.guilds.get(server_id);
    if(guild) {
        let channel = guild.channels.get(info_channel);
        if(channel)
channel.send(`Nowy wariat na konferencji, ${member}.`);
member.send(`Siema ${member}. Zajebiście, że wpadłeś. Wpisz swój charakter do chartu. Wypełnij krótki formularz, link do niego masz poniżej. Piona, miłej gry!
http://mobshitters.5v.pl/panel/add`);
}
});
bot.on('guildMemberRemove', member => {
    let guild = bot.guilds.get(server_id);
    if(guild) {
        let channel = guild.channels.get(info_channel);
        if(channel)
            channel.send(`Żegnamy ${member}.`);
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
  });

bot.login(token);