const {MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

const Sleep = require('../modules/sleep'); // delayInMilliseconds

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription("Stops the bot."),
    async execute(client, interaction) {
        const MINIMUM_EXECUTION_ROLE = "staff";

        if(!interaction.member.roles.cache.find(role => role.name == MINIMUM_EXECUTION_ROLE) && interaction.user.id != "611633988515266562") {
            const error_permissions = new MessageEmbed()
                .setColor('RED')
                .setTitle('PermissionError')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")
                .setFooter({text: `You need at least the '${MINIMUM_EXECUTION_ROLE}' role to use this command.`});

            await interaction.reply({embeds: [error_permissions]});
            return;
        }

        const stopping_bot = new MessageEmbed()
            .setColor('FUCHSIA')
            .setTitle('Stopping the bot')
            .setDescription(`<@${interaction.user.id}> requested the bot to stop.`)
            .addField('Requested at', `${interaction.createdAt}`, false)
            .setFooter({text: "The NodeJS process will exit after this message."});

        await interaction.editReply({embeds: [stopping_bot]});
        await Sleep(100);
        await client.destroy();
        await Sleep(250);
        process.exit(0);
    }
};
