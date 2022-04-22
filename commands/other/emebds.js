const {Client, Intents, Collection, MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embeds')
        .setDescription("This command is for testing purposes only. Please do not use this command.")
        .addStringOption((options) =>
            options
                .setName('command')
                .setDescription("The command.")
                .addChoice("ban", 'ban')
                .addChoice("kick", 'kick')
                .setRequired(true))
        .addBooleanOption((options) =>
            options
                .setName('ephemeral')
                .setDescription("[OPTIONAL] Whether you want the bot's messages to only be visible to yourself. Defaults to false.")
                .setRequired(false)),
    async execute(client, interaction) {
        //Command information
        const REQUIRED_ROLE = "Admin";

        //Declaring variables
        const is_ephemeral = interaction.options.getBoolean('ephemeral') || false;

        const command = interaction.options.getString('command');
        //Checks


        //Code
        switch(command) {
            case "ban":
                await interaction.reply({content: "Showing ban command messages.", ephemeral: is_ephemeral});
                const ban_error_permissions = new MessageEmbed()
                    .setColor('RED')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('PermissionError')
                    .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")
                    .setFooter({text: "You need at least the '${REQUIRED_ROLE}' role to use this command."});

                await interaction.channel.send({embeds: [ban_error_permissions], ephemeral: is_ephemeral});
                const ban_error_cannot_use_on_self = new MessageEmbed()
                    .setColor('ff2020')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle("Error")
                    .setDescription('You cannot ban yourself.');

                await interaction.channel.send({embeds: [ban_error_cannot_use_on_self], ephemeral: is_ephemeral});
                const ban_error_role_too_low = new MessageEmbed()
                    .setColor('ff2020')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('PermissionError')
                    .setDescription("Your highest role is lower than <@${memberTarget.id}>'s highest role.");

                await interaction.channel.send({embeds: [ban_error_role_too_low], ephemeral: is_ephemeral});
                const ban_error_equal_roles = new MessageEmbed()
                    .setColor('ff2020')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('PermissionError')
                    .setDescription("Your highest role is equal to <@${memberTarget.id}>'s highest role.");

                await interaction.channel.send({embeds: [ban_error_equal_roles], ephemeral: is_ephemeral});
                const ban_success_ban = new MessageEmbed()
                    .setColor('20ff20')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle("GuildMember ban")
                    .setDescription("<@${interaction.user.id}> banned <@${memberTarget.id}> from the guild${banDuration}.${reason}");

                await interaction.channel.send({embeds: [ban_success_ban], ephemeral: is_ephemeral});
                break;

            case "kick":
                interaction.reply({content: "Showing kick command messages.", ephemeral: is_ephemeral});
                const kick_error_permissions = new MessageEmbed()
                    .setColor('RED')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('PermissionError')
                    .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")
                    .setFooter({text: "You need at least the '${REQUIRED_ROLE}' role to use this command."});

                interaction.channel.send({embeds: [kick_error_permissions], ephemeral: is_ephemeral});
                const kick_error_cannot_use_on_self = new MessageEmbed()
                    .setColor('ff2020')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle("Error")
                    .setDescription('You cannot kick yourself.');

                interaction.channel.send({embeds: [kick_error_cannot_use_on_self], ephemeral: is_ephemeral});
                const kick_error_role_too_low = new MessageEmbed()
                    .setColor('ff2020')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('PermissionError')
                    .setDescription("Your highest role is lower than <@${memberTarget.id}>'s highest role.");

                interaction.channel.send({embeds: [kick_error_role_too_low], ephemeral: is_ephemeral});
                const kick_error_equal_roles = new MessageEmbed()
                    .setColor('ff2020')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle('PermissionError')
                    .setDescription("Your highest role is equal to <@${memberTarget.id}>'s highest role.");

                interaction.channel.send({embeds: [kick_error_equal_roles], ephemeral: is_ephemeral});
                const kick_success_kick = new MessageEmbed()
                    .setColor('20ff20')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle("GuildMember kick")
                    .setDescription("<@${interaction.user.id}> kicked <@${memberTarget.id}> from the guild.${reason}");

                interaction.channel.send({embeds: [kick_success_kick], ephemeral: is_ephemeral});
                break;
        }
    }
}
