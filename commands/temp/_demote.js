//REMOVE ROLE
//0x64656D6F7465
//0x64656d6f7465
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
        if(!args[0]) {
            message.channel.send("error: please provide a member to elevate")
            return;
        }
        const memberTarget = message.mentions.members.first()
        if(!args[1]) {
            message.channel.send("error: please provide a role: 0, 1, 2, 3")
            return;
        }
        memberTarget.roles.remove() //Owner
        memberTarget.roles.remove() //Admin
        memberTarget.roles.remove() //Mod
        memberTarget.roles.remove("908099650156892191") //Staff
    }
}
