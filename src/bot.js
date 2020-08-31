require('dotenv').config()

//console.log(process.env.DISCORDJS_BOT_TOKEN)

const {Client } = require('discord.js')

const client = new Client();
const PREFIX = "$"

client.on('ready', () => {
    console.log(`${client.user.tag}: bot has logged in`)
})
// message event
client.on('message', async (message) => {
    // check to see if author of message is a bot
    if(message.author.bot) return;
    /*console.log(`${message.author.tag} sent ${message.content}`)
    if(message.content === 'hello'){
        //message.reply('hello there')
        //message.channel.user._typing(`${message.author.username} is typing`)
        message.channel.send('hello')
    
    }*/

    //commands
    if(message.content.startsWith(PREFIX)){
        // array distructuring []
        // everytthing after cmdname will be stored as ...args var
        // spread operatore
        const [CMD_NAME, ...args]= message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/) // it will match all white spaces/remove them

        console.log(CMD_NAME)
        console.log(args)
        // assume arguments have name and arg separatedd by spaces
        if(CMD_NAME === 'kick'){
            //IF USER HAS KICK PERMISSION
            if(!message.member.hasPermission("KICK_MEMBERS")) return 
            message.reply('You do not have permissions to use that command');
           // message.channel.send('kicked the user')
           if(args.length=== 0 ) return message.reply('please provide an id')
            // we can only keep member in your guild/SERVER only
            const member = message.guild.members.cache.get(args[0])
            

            console.log(member)
            if(member){
                member
                    .kick()//; has a promise
                    .then((member) => message.channel.send(`${member} was kicked`))
                    .catch((err)=> message.channel.send('I do not have permissions :('))
            } else {
                message.channel.send('that member was not found')
            }
        } else if(CMD_NAME ==='ban') {
            if(!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply('You do not have permisson to ban members')

            if(args.length === 0) return message.reply('please provide an id');

            // to ban member
            
                //.catch((err)=> console.log(err))
                // to use async fun
                try {
                    const usertoban= message.guild.members.ban(args[0])
                    console.log(usertoban)

                    message.channel.send('User was banned successfully')
                } catch (err) {
                    console.log(err)
                    message.channel.send('An error occured . Either i don havepermission or user not found')
                }
        }
    }

});

client.login(process.env.DISCORDJS_BOT_TOKEN)