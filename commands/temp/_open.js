module.exports = {
    callback: (message, Discord, client, ...args) => {
        //Declaring variables

        //Declaring functions

        //Checks
        if(message.member.user.id !== "611633988515266562") {
            message.reply("you're not jerry, you can't use the command. so sad D:. it's a temporary command though")
            return;
        }
        //Code
        message.channel.guild.channels.create("test-channel")
            .then((channel) => {
                channel.send(`<@${message.member.user.id}>`)
                channel.send("hello world!")
            })
    }
}
