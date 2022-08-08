const {Client, Intents, Collection, MessageEmbed} = require('discord.js');

const Sleep = require('../modules/sleep'); //delayInMilliseconds;
// const Log = require('../modules/logger'); //DEBUG, ERROR, FATAL, INFO, LOG, WARN; │, ─, ├─, └─;

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        if(!interaction.isCommand()) {
            return;
        }

        const command = interaction.client.commands.get(interaction.commandName);

        if(!command) {
            return;
        }
        try {
            // const embed = new MessageEmbed()
            //     .setColor('RED')
            //     .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 16})}`)
            //     .addField('Warning', `<@${interaction.user.id}>, This bot is deprecated and is replaced by JerryBot. This bot's commands will be removed in the future.`, false)
            //     .setFooter({text: "The command will be executed after this message."})

            // await interaction.channel.send({embeds: [embed]});
            await command.execute(interaction.client, interaction);
        } catch(err) {
            if(err) {
                console.error(err);
                const _error = ":\n```\n" + err + "\n```" || " No further information is available.";
                const execute_error = new MessageEmbed()
                    .setColor('#bb20ff')
                    .setTitle('Error')
                    .setDescription(`An error occured while executing the command${_error}`)
                    .setTimestamp()
                try {
                    await interaction.reply({embeds: [execute_error], ephemeral: false});
                } catch {
                    try {
                        await interaction.followUp({embeds: [execute_error], ephemeral: false});
                        return;
                    } catch {
                        try {
                            await interaction.channel.send({embeds: [execute_error], ephemeral: false});
                            return;
                        } catch {
                            console.log("Could not send an error message in the text channel.");
                            return;
                        }
                    }
                }
            }
        }
    }
}