//DEL CHANNEL
//0x646368616E
//0x646368616e
module.exports = {
    callback: (message, Discord, client, ...args) => {
        //Command information

        //Declaring variables

        //Declaring functions

        //Checks
        if(!message.member.user.id == "611633988515266562") {
            message.channel.send("you're not jerry, you can't use the command. so sad D:. it's a temporary command though")
            return;
        }
        //Code
        message.channel.send("Goodbye!")
            .then(() => {
                message.channel.delete()
            })
    }
}
