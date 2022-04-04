const Discord = require('discord.js')
const {Collection} = require('discocrd.js')
const {Intents} = Discord
const {REST} = require('@discordjs/rest')
const {Routes} = require('@discordjs/-api-types/v9')

require('dotenv').config()

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

client.on('ready', () => {
    console.log("Goldfish Bot is now online.")

    let handler = require('./command_handler')

    if(handler.default) {
        handler = handler.default
    }

    handler(client)
    require('./events/ready_event')(Discord, client)
})
client.on('guildMemberAdd', (guildMember) => {
    guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name == "Goldfish"))
})

client.login(process.env.DISCORD_BOT_TOKEN_GOLDFISH);
