const {Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

const Sleep = require('../../modules/sleep');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription("Kicks a user from the guild.")
        .addUserOption((options) =>
            options
                .setName('user')
                .setDescription("The user to kick.")
                .setRequired(true))
        .addStringOption((options) =>
            options
                .setName('reason')
                .setDescription("The reason for the kick.")
                .setRequired(false))
        .addBooleanOption((options) =>
            options
                .setName('ephemeral')
                .setDescription("Whether you want the bot's messages to only be visible to yourself.")
                .setRequired(false)),
    async execute(client, interaction) {
        //Command information
        const REQUIRED_ROLE = "Mod";

        //Declaring variables
        const is_ephemeral = interaction.options.getBoolean('ephemeral');
        const target = interaction.options.getUser('user');
        const memberTarget = interaction.guild.members.cache.get(target.id);

        let reason = interaction.options.getString('reason');

        let isRole = "";
        let isRoleTitle = "";
        let kickAnyway = "";

        //Checks
        if(!interaction.member.roles.cache.find(role => role.name == REQUIRED_ROLE)) {
            const error_permissions = new MessageEmbed()
                .setColor('RED')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('PermissionError')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")
                .setFooter({text: `You need at least the '${REQUIRED_ROLE}' role to use this command.`});

            interaction.reply({embeds: [error_permissions], ephemeral: is_ephemeral});
            return;
        }
        if(memberTarget.id == interaction.user.id) {
            const error_cannot_use_on_self = new MessageEmbed()
                .setColor('ff2020')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle("Error")
                .setDescription('You cannot kick yourself.');

            interaction.reply({embeds: [error_cannot_use_on_self], ephemeral: is_ephemeral});
            return;
        }
        //---Role position check
        if(memberTarget.roles.highest.position > interaction.member.roles.highest.position) {
            const error_role_too_low = new MessageEmbed()
                .setColor('ff2020')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('PermissionError')
                .setDescription(`Your highest role is lower than <@${memberTarget.id}>'s highest role.`);

            interaction.reply({embeds: [error_role_too_low], ephemeral: is_ephemeral});
            return;
        }
        if(memberTarget.roles.highest.position >= interaction.member.roles.highest.position) {
            const error_equal_roles = new MessageEmbed()
                .setColor('ff2020')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('PermissionError')
                .setDescription(`Your highest role is equal to <@${memberTarget.id}>'s highest role.`);

            interaction.reply({embeds: [error_equal_roles], ephemeral: is_ephemeral});
            return;
        }
        //Role position check---
        if(memberTarget.roles.cache.find(role => role.name == "Owner")) {
            kickAnyway = " anyway";
            isRoleTitle = " Owner";
            isRole = " They have the 'Owner' role.";
        } else if(memberTarget.roles.cache.find(role => role.name == "Admin")) {
            kickAnyway = " anyway";
            isRoleTitle = " Administrator";
            isRole = " They have the 'Administrator' role.";
        } else if(memberTarget.roles.cache.find(role => role.name == "Mod")) {
            kickAnyway = " anyway";
            isRoleTitle = " Moderator";
            isRole = " They have the 'Moderator' role.";
        } else if(memberTarget.roles.cache.find(role => role.name == "staff")) {
            kickAnyway = " anyway";
            isRoleTitle = " Staff";
            isRole = " They have the 'Staff' role.";
        } else if(memberTarget.roles.cache.find(role => role.name == "Trusted")) {
            kickAnyway = " anyway";
            isRoleTitle = " Trusted";
            isRole = " They are a trusted member.";
        }
        //---Developer immunity
        if(memberTarget.id == "611633988515266562") {
            interaction.defer() //MAKE THE INTERACTION WAIT LONGER HERE
            await Sleep(1000)
            await interaction.channel.sendTyping()
            await Sleep(750)
            await interaction.channel.send({content: `Hey <@${interaction.user.id}>,`})
            await Sleep(250)
            await interaction.channel.sendTyping()
            await Sleep(1500)
            await interaction.channel.send({content: `Did you just try to kick <@${memberTarget.id}>?`})
            await Sleep(250)
            await interaction.channel.sendTyping()
            await Sleep(2000)
            await interaction.channel.send({content: "You know he's the developer of this bot, right?."})
            await Sleep(250)
            await interaction.channel.sendTyping()
            await Sleep(2000)
            await interaction.channel.send({content: "You know that your actions are completely intolerable and very rude, right?"})
            await Sleep(2000)
            const dev_immunity = new MessageEmbed()
                .setColor('RED')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription(`<@${memberTarget.id}> is immune to this command because they are bot developer (and because they are cool).`)
                .setFooter({text: "You can still manually ban him via his Discord profile but don't tell Jerry I told you this or else he be mad at me!"})

            await interaction.reply({embeds: [dev_immunity], ephemeral: false});
            await Sleep(250)
            await interaction.channel.sendTyping()
            await Sleep(500)
            await interaction.followUp({content: "Nice try though."})
            return;
        }
        //Developer immunity---

        //Code
        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('kick_confirm_button')
                    .setLabel(`Kick${kickAnyway}`)
                    .setStyle('DANGER')
                    .setDisabled(false),
                new MessageButton()
                    .setCustomId('kick_cancel_button')
                    .setLabel('Cancel')
                    .setStyle('PRIMARY')
                    .setDisabled(false)
            )

        const confirm_kick = new MessageEmbed()
            .setColor('YELLOW')
            .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle(`Confirm Kick${isRoleTitle}`)
            .setDescription(`Are you sure you want to kick <@${memberTarget.id}>?${isRole}`)

        interaction.reply({embeds: [confirm_kick], components: [row], ephemeral: is_ephemeral})

        const filter = (buttonInteraction) => {
            if(buttonInteraction.user.id == interaction.user.id) {
                return true;
            } else {
                return buttonInteraction.reply({content: "You cannot use this button.", ephemeral: true});
            }
        }
        const kick_collector = interaction.channel.createMessageComponentCollector({filter, time: 30000});

        kick_collector.on('collect', async buttonInteraction => {
            //Disabling buttons
            row.components[0]
                .setDisabled(true);
            row.components[1]
                .setDisabled(true);
            interaction.editReply({embeds: [confirm_kick], components: [row], ephemeral: is_ephemeral});

            if(buttonInteraction.customId == 'kick_confirm_button') {
                reason = reason ? ` \n**Reason:** ${reason}` : "";
                memberTarget.kick(reason)
                    .then(kickResult => {
                        const success_kick = new MessageEmbed()
                            .setColor('20ff20')
                            .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                            .setTitle("GuildMember kick")
                            .setDescription(`<@${interaction.user.id}> kicked <@${memberTarget.id}> from the guild.${reason}`);

                        buttonInteraction.reply({embeds: [success_kick], ephemeral: is_ephemeral});
                    })
                kick_collector.stop();
            } else {
                const cancel_kick = new MessageEmbed()
                    .setColor('GREEN')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`<@${interaction.user.id}> cancelled the kick.`);

                buttonInteraction.reply({embeds: [cancel_kick], ephemeral: is_ephemeral});
            }
            kick_collector.stop();
        })
    }
}
