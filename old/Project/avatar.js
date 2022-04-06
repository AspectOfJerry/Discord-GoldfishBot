module.exports = {
    callback: (message, Discord, client, ...args) => {
        //Help command
        if(args[0] == '?') {
            const help_command = new Discord.MessageEmbed()
                .setColor('#ff2020')
                .setAuthor({name: "DeprecationWarning"})
                .setDescription('This command is deprecated, and it is replaced by `,profile`.')
                .setFooter({text: `${message.author.tag} • ${COMMAND_NAME}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setTimestamp();

            message.channel.send({embeds: [help_command]})
            return;
        }

        //Code
        const deprecation_warning = new Discord.MessageEmbed()
            .setColor('#ff2020')
            .setAuthor({name: "DeprecationWarning"})
            .setDescription('This command is deprecated, and it is replaced by `,profile`.')
            .setFooter({text: `${message.author.tag} • ${COMMAND_NAME}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setTimestamp();

        message.channel.send({embeds: [deprecation_warning]})
    }
}
