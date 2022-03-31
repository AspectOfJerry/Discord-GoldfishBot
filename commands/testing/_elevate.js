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
        if(!args[0]) {
            message.reply("error: please provide a member to elevate")
            return;
        }
        const memberTarget = message.mentions.members.first()
        if(!args[1]) {
            message.reply("error: please provide a role: 0, 1, 2, 3")
            return;
        } else if(args[1] == 0) {
            memberTarget.roles.add("890075267517784116")  //Owner
            memberTarget.roles.add("890076599926521916")
            memberTarget.roles.add("890076942164983808")
            memberTarget.roles.add("908099650156892191")

            message.reply("You are now OP")
        } else if(args[1] == 1) {
            memberTarget.roles.add("890076599926521916")  //Admin
            memberTarget.roles.add("890076942164983808")
            memberTarget.roles.add("908099650156892191")

            message.reply("You are now OP")
        } else if(args[1] == 2) {
            memberTarget.roles.add("890076942164983808")  //Mod
            memberTarget.roles.add("908099650156892191")

            message.reply("You are now OP")
        } else if(args[1] == 3) {
            memberTarget.roles.add("908099650156892191")    //staff

            message.reply("You are now OP")
        } else {
            message.reply("0 or 1 or 2 or 3")
        }
    }
}
