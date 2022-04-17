const {Client, Intents, Collection, MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("test")
        .addUserOption((options) =>
            options
                .setName('user')
                .setDescription("user")
                .setRequired(false))
        .addBooleanOption((options) =>
            options
                .setName('ephemeral')
                .setDescription("Whether you want the bot's messages to only be visible to yourself.")
                .setRequired(false)),
    async execute(client, interaction) {
        //Command information
        const REQUIRED_ROLE = "";

        //Declaring variables
        const is_ephemeral = interaction.options.getBoolean('ephemeral');
        //const target = interaction.options.getUser('user');
        //const memberTarget = interaction.guild.members.cache.get(target.id);

        //Checks

        //Code
        interaction.reply({content: "Nothing here for now...", ephemeral: is_ephemeral});
    }
}