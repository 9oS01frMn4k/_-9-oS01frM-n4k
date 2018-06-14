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

  
if (message.author.id === client.user.id) return;
  if (message.guild) {
 let embed = new Discord.RichEmbed()
  let args = message.content.split(' ').slice(1).join(' ');
if(message.content.split(' ')[0] == prefix + 'bcm') {
  if (!args[1]) {
return;
}
      message.guild.members.forEach(m => {
   if (message.author.id !== ("184706878876549131"))  
    message.delete();
          var bc = new Discord.RichEmbed()
          .addField(' » Message: ', args)
          .setColor('#ff0000')
          // m.send(`[${m}]`);
          m.send(`${m}`,{embed: bc});
      });
  }
  } else {
      return;
  }
  
if(cmd === `${prefix}poll`){
let question = args.slice(0).join(" ");

if (args.length === 0)
return message.channel.send("poll <message>")

if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You dont have the Permission `MANAGE_SERVER`");

const pollembed = new Discord.RichEmbed()
.setTitle("A Poll Has Been Started!")
.setColor(`#15f153`)
.setDescription(`${question}`)
.setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`)
message.delete()

message.channel.send(pollembed)

.then(function (message, str) {
     message.react('453541489327472660')
     message.react('453541419966136321')
   }).catch(function() {
});
}
if(message.content.startsWith(prefix + 'serverinfo')) {
const vlevel = ['None', 'Low (Must have verified email)', 'Medium (Must be register for 5 mineuts)', 'High (Need to wait 10 minutes)', 'Very High (Need verified phone on account)']
const members = await message.guild.members.filter(m=> m.presence.status === 'online').size + message.guild.members.filter(m=> m.presence.status === 'idle').size + message.guild.members.filter(m=> m.presence.status === 'dnd').size
message.channel.send(new Discord.RichEmbed()
.setAuthor(`${message.guild.name} [Server Icon URL]`, message.guild.iconURL)
.setURL(message.guild.iconURL)
.addField('🆔 Server ID', message.guild.id, true)
.addField('👑 Server Owner', message.guild.owner, true)
.addField('🗺 Region', message.guild.region, true)
.addField(`👥 Members [${message.guild.memberCount}]`, `${members} online` ,true)
.addField(`💬 Channels`, `**${message.guild.channels.filter(c => c.type === 'category').size}** Categories | **${message.guild.channels.filter(c=> c.type === 'text').size}** Text | **${message.guild.channels.filter(c=> c.type === 'voice').size}** Voice` ,true)
.addField(`💠 Verification Level`, vlevel[message.guild.verificationLevel] ,true)
.addField(`👔 Roles`, message.guild.roles.size ,true)
.addField(`📆 Created On`, message.guild.createdAt ,true)
)
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
  if (cmd === `${prefix}say`){
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
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
    if (cmd === `${prefix}avatar`){
   let user = message.mentions.users.first() || message.author; // Mention to get avatar or if no mention it will take author's avatar and send it!
    
    // avatar embed
    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}'s Avatar`)
    .setImage(user.displayAvatarURL) // User's Avatar
    .setColor('RANDOM') // It will generate random colors now let's test it out!
    // Sends the avatar embed in the channel.
    message.channel.send(embed)
}

   if (cmd === `${prefix}help`){
   message.reply('Beep boop, check your dm :mailbox_with_mail: ');

   message.author.send(`${prefix}serverinfo - info about the server\n\
${prefix}report - report someone for breaking the server rules
${prefix}botinfo - info about the bot
${prefix}say (text) - The Bot Say everything
${prefix}moveall - move all members to one room - you can mute all by .moveall (room name) -mute
${prefix}invite - Invite the bot to your server
${prefix}avatar - your/someone avatar`);
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
