module.exports = {
    callback: (message, Discord, client, ...args) => {
        //Command information
        const COMMAND_NAME = "ban";
        const REQUIRED_ROLE = "Admin";
        const EXCPECTED_ARGUMENTS = 1;
        const OPTIONAL_ARGUMENTS = 1;

        //Help command
        if(args[0] == '?') {
            const help_command = new Discord.MessageEmbed()
                .setColor('#2020ff')
                .setAuthor({name: "./commands/ban.js; Lines: 173; File size: ~8.3 KB", iconURL: "https://winaero.com/blog/wp-content/uploads/2018/12/file-explorer-folder-libraries-icon-18298.png"})
                .setTitle(`,${COMMAND_NAME} command help (${REQUIRED_ROLE})`)
                .setDescription('This command bans a user from the guild.')
                .addField(`Usage`, "`" + `,${COMMAND_NAME}` + " <user> (<reason>)" + "`", false)
                .addField(`Excpected arguments`, `${EXCPECTED_ARGUMENTS} case-sensitive`, true)
                .addField(`Optional arguments`, `${OPTIONAL_ARGUMENTS} case-insensitive`, true)
                .addField('Related commands', "`kick`", false)
                .setFooter({text: `Executed by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})

            message.channel.send({embeds: [help_command]})
            return;
        }

        //Declaring variables
        let verdict;
        let messageMemberHighestRole;
        let memberTargetHighestRole;

        //Declaring functions
        function GetMessageMemberHighestRole(message) {
            if(message.member.roles.cache.find(role => role.name == "Owner")) {
                return 0;
            } else if(message.member.roles.cache.find(role => role.name == "Admin")) {
                return 1;
            } else if(message.member.roles.cache.find(role => role.name == "Mod")) {
                return 2;
            } else if(message.member.roles.cache.find(role => role.name == "staff")) {
                return 3;
            } else {
                return null;
            }
        }
        function GetMemberTargetHighestRole(memberTarget) {
            if(memberTarget.roles.cache.find(role => role.name == "Owner")) {
                return 0;
            } else if(memberTarget.roles.cache.find(role => role.name == "Admin")) {
                return 1;
            } else if(memberTarget.roles.cache.find(role => role.name == "Mod")) {
                return 2;
            } else if(memberTarget.roles.cache.find(role => role.name == "staff")) {
                return 3;
            } else {
                return null;
            }
        }
        function CanMessageMemberExecute(messageMemberHighestRole, memberTargetHighestRole) {
            if(messageMemberHighestRole == memberTargetHighestRole) {
                return "equal";
            } else if(messageMemberHighestRole < memberTargetHighestRole || memberTargetHighestRole == null) {
                return "yes";
            } else {
                return "no";
            }
        }
        function Verdict(message, verdict) {
            if(verdict == "equal") {
                const error_equal_roles = new Discord.MessageEmbed()
                    .setColor('ff2020')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`**Error:** Your highest role is equal to <@${message.member.user.id}>'s highest role.`)
                    .setFooter({text: "Your role must be higher than the targeted member's role."})

                message.channel.send({embeds: [error_equal_roles]})
                return;
            } else if(verdict == "yes") {
                memberTarget.ban()
                    .then((banResult) => {
                        const success_ban = new Discord.MessageEmbed()
                            .setColor('20ff20')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                            .setTitle("User ban")
                            .setDescription(`<@${message.member.user.id}> banned <@${memberTarget.user.id}>.`)

                        message.channel.send({embeds: [success_ban]})
                        return;
                    })
                    .catch((error) => {
                        console.log(error)
                        const error_catch = new Discord.MessageEmbed()
                            .setColor('#ff20ff')
                            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 32})}`)
                            .setTitle("Critical error catch")
                            .setDescription("An error was caught at line `89`.")
                            .addField("code", `${error.code}`, true)
                            .addField("httpsStatus", `${error.httpStatus}`, true)
                            .addField("path", `${error.path}`, false)

                        message.channel.send({embeds: [error_catch]})
                    })
            } else {
                const error_role_too_low = new Discord.MessageEmbed()
                    .setColor('ff2020')
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                    .setDescription(`**Error:** Your role is lower then <@${memberTarget.user.id}>'s role.`)
                    .setFooter({text: "Your role must be higher than the targeted member's role."})

                message.channel.send({embeds: [error_role_too_low]})
                return;
            }
        }
        function ConfirmBanFriend(message, memberTarget) {
            if(memberTarget.roles.cache.find(role => role.name == "Friends")) {

            }
        }

        //Checks
        if(!message.member.roles.cache.find(role => role.name == REQUIRED_ROLE)) {
            const error_permissions = new Discord.MessageEmbed()
                .setColor('#ff2020')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send({embeds: [error_permissions]})
            return;
        }
        if(!args[0]) {
            const error_missing_arguments = new Discord.MessageEmbed()
                .setColor('#ff2020')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription(`**Error:** Please provide a member to ban. Excpected **${EXCPECTED_ARGUMENTS}** arguments but only provided **0**.`)
                .setFooter({text: "Use " + "`" + `,${COMMAND_NAME} ?` + "`" + " for help."})

            message.channel.send({embeds: [error_missing_arguments]})
            return;
        }
        const target = message.mentions.users.first();
        if(!target) {
            const reference_error_target = new Discord.MessageEmbed()
                .setColor('ff2020')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("**ReferenceError:** Please provide a valid member to ban.")
                .setFooter({text: "Use " + "`" + `,${COMMAND_NAME} ?` + "`" + " for help."})

            message.channel.send({embeds: [reference_error_target]})
            return;
        }
        const memberTarget = message.guild.members.cache.get(target.id);
        if(memberTarget == message.member) {
            const error_cannot_use_on_self = new Discord.MessageEmbed()
                .setColor('ff2020')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("**Error:** You cannot use this command on yourself. Ban someone else!")

            message.channel.send({embeds: [error_cannot_use_on_self]})
            return;
        }

        //Code
        messageMemberHighestRole = GetMessageMemberHighestRole(message)
        memberTargetHighestRole = GetMemberTargetHighestRole(memberTarget)

        verdict = CanMessageMemberExecute(messageMemberHighestRole, memberTargetHighestRole)

        ConfirmBanFriend(message, memberTarget)

        Verdict(message, verdict)
    }
}
