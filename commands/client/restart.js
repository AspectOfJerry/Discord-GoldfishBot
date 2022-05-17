const {Client, Intents, Collection, MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

const Sleep = require('../../modules/sleep'); //delayInMilliseconds;
const Log = require('../../modules/logger'); //DEBUG, ERROR, FATAL, INFO, LOG, WARN; │, ─, ├─, └─;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription("Restarts the bot.")
        .addStringOption((options) =>
            options
                .setName('reason')
                .setDescription("The reason for the restart request.")
                .setRequired(false))
        .addBooleanOption((options) =>
            options
                .setName('ephemeral')
                .setDescription("[OPTIONAL] Whether you want the bot's messages to only be visible to yourself. Defaults to false.")
                .setRequired(false)),
    async execute(client, interaction) {
        //Command information
        const REQUIRED_ROLE = "staff";

        //Declaring variables
        const is_ephemeral = interaction.options.getBoolean('ephemeral') || false;

        const reason = interaction.options.getString('reason') || "No reason provided";

        const destroying_client = new MessageEmbed()
            .setColor('FUCHSIA')
            .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription("Destroying the client...");
        const soft_restart = new MessageEmbed()
            .setColor('YELLOW')
            .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription("Initiating a soft restart...");
        //Checks
        if(!interaction.member.roles.cache.find(role => role.name == REQUIRED_ROLE)) {
            const error_permissions = new MessageEmbed()
                .setColor('RED')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('PermissionError')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")
                .setFooter({text: `You need at least the '${REQUIRED_ROLE}' role to use this command.`});

            await interaction.reply({embeds: [error_permissions], ephemeral: is_ephemeral});
            return;
        }

        //Code
        interaction.reply({embeds: [soft_restart], ephemeral: false})
        await interaction.channel.send({embeds: [destroying_client], ephemeral: false})
        const channel = client.channels.cache.get(interaction.channel.id);
        client.destroy();

        await Sleep(2500)
        await client.login(process.env.DISCORD_BOT_TOKEN_JERRY)
        const online = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription("The bot has restarted!")
            .addField('Reason', `${reason}`, false);

        channel.send({embeds: [online], ephemeral: false});
    }
}
