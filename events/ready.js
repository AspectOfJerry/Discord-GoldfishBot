const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

const Sleep = require('../modules/sleep'); //delayInMilliseconds;
const Log = require('../modules/logger'); //DEBUG, ERROR, FATAL, INFO, LOG, WARN; │, ─, ├─, └─;

require('dotenv').config();

module.exports = {
    name: 'ready',
    once: true,
    execute(client, commands) {
        console.log("Goldfish Bot is now online.")

        const client_id = client.user.id;
        const goldfish_guild_id = process.env.DISCORD_GOLDFISH_GUILD_ID;
        const rest = new REST({
            version: "9"
        }).setToken(process.env.DISCORD_BOT_TOKEN_GOLDFISH);

        (async () => {
            try {
                await rest.put(Routes.applicationGuildCommands(client_id, goldfish_guild_id)
                    , {
                        body: commands
                    });
                console.log(`Successfully registered commands locally in ${goldfish_guild_id}.`);
            } catch(error) {
                if(error) {
                    console.error(error);
                }
            }
        })();
    }
}