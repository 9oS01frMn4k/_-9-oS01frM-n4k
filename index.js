const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Bot is Online!`);
  client.user.setGame(`${client.guilds.size} servers | .help`);
});

// Updates the bot's status if he joins a server
client.on("guildCreate", guild => {
   client.user.setGame(`${client.guilds.size} servers | .help`);
});

/// Updates the bot's status if he leaves a servers
client.on("guildDelete", guild => {
    client.user.setGame(
        `${client.guilds.size} servers | .help`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


  let prefix = process.env.BOT_PREFIX;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);



  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
     .setDescription("Server Information")
     .setColor("#15f153")
     .setThumbnail(sicon)
     .addField("Server Name", message.guild.name)
     .addField("Created On", message.guild.createdAt)
     .addField("Joined At", message.member.joinedAt)
     .addField("Members", message.guild.memberCount);

   return message.channel.send(serverembed);

 if (cmd === `${prefix}say`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(0x954D23)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}
  if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }


   if(cmd === `${prefix}botinfo`){

   let bicon = client.user.displayAvatarURL;
   let botembed = new Discord.RichEmbed()
   .setDescription("Bot Informtaion")
   .setColor("#15f153")
   .setThumbnail(bicon)
   .addField("Bot Name", client.user.username)
   .addField("Created On", client.user.createdAt);

     return message.channel.send(botembed);
   }
 if (cmd === `${prefix}invite`){
   message.reply('Invite the bot to your server :wink: https://discordapp.com/oauth2/authorize?client_id=433340501111078922&scope=bot&permissions=20972552');
 }

   if (cmd === `${prefix}help`){
   message.reply('Please check your direct messages :mailbox_with_no_mail:');
   message.author.send(`${prefix}serverinfo - info about the server\n\
${prefix}report - report someone for breaking the server rules
${prefix}botinfo - info about the bot
${prefix}moveall (room) (-mute - if you want) - move members - only staff
${prefix}say (text) - The bot says what you say
${prefix}invite - invite the bot to your server by .invite`);
   }

if (cmd === `${prefix}moveall`){
  let isAdmin = message.member.roles.filterArray(role => {return role.name === 'Owner' || role.name === 'Move-all-er';}).length;
  if (isAdmin === 0){
    return;
  }
  if (message.content.indexOf(".moveall") > -1) {
    channelGetName = message.content.slice(9, 9999);
    findChannel = client.channels.find('name', channelGetName);
    if (message.content.indexOf("-mute") > -1) {
      MoveMuteUsers(findChannel);
    } else{
      MoveUsers(findChannel);
    }
  }
}
});

function MoveUsers(findChannel){
  client.channels.findAll('type', 'voice').forEach(channelInfo => {
    if (channelInfo.name.indexOf("AFK") > -1 ){
      console.log("afk");
    } else {
      channelInfo.members.array().forEach(memberNumber => {
        memberNumber.setVoiceChannel(findChannel);
        console.log('moving');
        });
    }
});
}

function MoveMuteUsers(findChannel){
  client.channels.findAll('type', 'voice').forEach(channelInfo => {
    if (channelInfo.name.indexOf("AFK") > -1 ){
      console.log("afk");
    } else {
      channelInfo.members.array().forEach(memberNumber => {
        memberNumber.setVoiceChannel(findChannel);
        memberNumber.setMute(true, 'moveall');
        console.log('moving');
        });
    }
});
}


// * Move from specific channels.
// * ignore specific users.


client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(process.env.BOT_TOKEN);
