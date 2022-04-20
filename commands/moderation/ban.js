const {Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

const Sleep = require('../../modules/sleep');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription("Bans a user from the guild.")
        .addUserOption((options) =>
            options
                .setName('user')
                .setDescription("The user to ban.")
                .setRequired(true))
        .addIntegerOption((options) =>
            options
                .setName('duration')
                .setDescription("The duration of the ban in days (0 to 7). Defaults to 0 (no duration).")
                .addChoice("No duration", 0)
                .addChoice("1 day", 1)
                .addChoice("2 days", 2)
                .addChoice("3 days", 3)
                .addChoice("4 days", 4)
                .addChoice("5 days", 5)
                .addChoice("6 days", 6)
                .addChoice("7 days", 7)
                .setRequired(false))
        .addStringOption((options) =>
            options
                .setName('reason')
                .setDescription("The reason for the ban.")
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

        let banDuration = interaction.options.getInteger('duration');
        let reason = interaction.options.getString('reason');

        let isRole = "";
        let isRoleTitle = "";
        let banAnyway = "";

        //Check
        if(!interaction.member.roles.cache.find(role => role.name == REQUIRED_ROLE)) {
            const error_permissions = new MessageEmbed()
                .setColor('RED')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle('PermissionError')
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server Admins if you believe that this is an error.")
                .setFooter({text: `You need at least the '${REQUIRED_ROLE}' role to use this command.`});

            interaction.reply({embeds: [error_permissions], ephemeral: is_ephemeral});
            return;
        }
        if(memberTarget.id == interaction.user.id) {
            const error_cannot_use_on_self = new MessageEmbed()
                .setColor('ff2020')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle("Error")
                .setDescription('You cannot ban yourself.');

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
            banAnyway = " anyway";
            isRoleTitle = " Owner";
            isRole = " They have the 'Owner' role.";
        } else if(memberTarget.roles.cache.find(role => role.name == "Admin")) {
            banAnyway = " anyway";
            isRoleTitle = " Admin";
            isRole = " They have the 'Admin' role.";
        } else if(memberTarget.roles.cache.find(role => role.name == "Mod")) {
            banAnyway = " anyway";
            isRoleTitle = " Mod";
            isRole = " They have the 'Mod' role.";
        } else if(memberTarget.roles.cache.find(role => role.name == "staff")) {
            banAnyway = " anyway";
            isRoleTitle = " staff";
            isRole = " They have the 'staff' role.";
        } else if(memberTarget.roles.cache.find(role => role.name == "Trusted")) {
            banAnyway = " anyway";
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
            await interaction.channel.send({content: `Did you just try to ban <@${memberTarget.id}>?`})
            await Sleep(250)
            await interaction.channel.sendTyping()
            await Sleep(2000)
            await interaction.channel.send({content: "You know he's the developer of this bot, right?."})
            await Sleep(250)
            await interaction.channel.sendTyping()
            await Sleep(2000)
            await interaction.channel.send({content: "You know that your actions are completely intolerable and very rude, right?"})
            await Sleep(250)
            await interaction.channel.sendTyping()
            await Sleep(2500)
            await interaction.channel.send({content: `I would never ban <@${memberTarget.id}> from this guild. Even less with your hostile attitude...`})
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
                    .setCustomId('ban_confirm_button')
                    .setLabel(`Ban${banAnyway}`)
                    .setStyle('DANGER')
                    .setDisabled(false),
                new MessageButton()
                    .setCustomId('ban_cancel_button')
                    .setLabel('Cancel')
                    .setStyle('PRIMARY')
                    .setDisabled(false)
            )

        const confirm_ban = new MessageEmbed()
            .setColor('YELLOW')
            .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
            .setTitle(`Confirm Ban${isRoleTitle}`)
            .setDescription(`Are you sure you want to ban <@${memberTarget.id}>?${isRole}`)

        interaction.reply({embeds: [confirm_ban], components: [row], ephemeral: is_ephemeral})

        const filter = (buttonInteraction) => {
            if(buttonInteraction.user.id == interaction.user.id) {
                return true;
            } else {
                return buttonInteraction.reply({content: "You cannot use this button.", ephemeral: true});
            }
        }
        const ban_collector = interaction.channel.createMessageComponentCollector({filter, time: 30000});

        ban_collector.on('collect', async buttonInteraction => {
            //Disabling buttons
            row.components[0]
                .setDisabled(true);
            row.components[1]
                .setDisabled(true);
            interaction.editReply({embeds: [confirm_ban], components: [row], ephemeral: is_ephemeral});

            if(buttonInteraction.customId == 'ban_confirm_button') {
                reason = reason ? ` \n**Reason:** ${reason}` : "";
                banDuration = banDuration ? banDuration : 0;
                memberTarget.ban(banDuration, reason)
                    .then(banResult => {
                        if(banDuration == 0) {
                            banDuration = "";
                        } else {
                            banDuration = ` for ${banDuration} days`;
                        }
                        const success_ban = new MessageEmbed()
                            .setColor('20ff20')
                            .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                            .setTitle("GuildMember ban")
                            .setDescription(`<@${interaction.user.id}> banned <@${memberTarget.id}> from the guild${banDuration}.${reason}`);

                        interaction.reply({embeds: [success_ban], ephemeral: is_ephemeral});
                    })
                ban_collector.stop();
            } else {
                const cancel_ban = new MessageEmbed()
                    .setColor('GREEN')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`<@${interaction.user.id}> cancelled the ban.`);

                buttonInteraction.reply({embeds: [cancel_ban], ephemeral: is_ephemeral});
            }
            ban_collector.stop();
        })
    }
}
