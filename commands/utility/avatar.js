const {Client, Intents, Collection, MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

const Sleep = require('../../modules/sleep'); //delayInMilliseconds;
const Log = require('../../modules/logger'); //DEBUG, ERROR, FATAL, INFO, LOG, WARN; │, ─, ├─, └─;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription("[OBSOLETE] Please use the '/profile' command instead. Sends a user's avatar.")
        .addUserOption((options) =>
            options
                .setName('user')
                .setDescription("[OPTIONAL] The user's avatar to send. Defaults to yourself.")
                .setRequired(false))
        .addBooleanOption((options) =>
            options
                .setName('ephemeral')
                .setDescription("[OPTIONAL] Whether you want the bot's messages to only be visible to yourself. Defaults to false.")
                .setRequired(false)),
    async execute(client, interaction) {
        //Command information
        const REQUIRED_ROLE = "everyone";

        //Declaring variables
        const is_ephemeral = interaction.options.getBoolean('ephemeral') || false;
        const target = interaction.options.getUser('user');
        const memberTarget = interaction.guild.members.cache.get(target.id);

        //Checks

        //Code
        const deprecation_warning = new MessageEmbed()
            .setColor('RED')
            .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle('DeprecationWarning')
            .setDescription("This command is obsolete. Please use the `/profile` command instead.")

        interaction.reply({emebds: [deprecation_warning], ephemeral: is_ephemeral});
    }
}
