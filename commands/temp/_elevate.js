//GIVE ROLE
//0x656C6576617465
//0x656c6576617465
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
        } else if(args[1] == 0) {
            memberTarget.roles.add("")  //Owner
        } else if(args[1] == 1) {
            memberTarget.roles.add("")  //Admin
        } else if(args[1] == 2) {
            memberTarget.roles.add("")  //Mod
        } else if(args[1] == 3) {
            memberTarget.roles.add("908099650156892191")    //staff
        } else {
            message.channel.send("nope, 0 or 1 or 2 or 3. not that hard tbh jerry")
        }
    }
}
