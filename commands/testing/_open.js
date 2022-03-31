module.exports = {
    callback: (message, Discord, client, ...args) => {
        //Declaring variables

        //Declaring functions

        //Checks
        if(message.member.user.id !== "611633988515266562") {
            message.reply("You cannot use this command. Only Jerry#3756 can!")
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
