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
        if(!args[0]) {
            message.reply("error: please provide a member to elevate")
            return;
        }
        const memberTarget = message.mentions.members.first()

        memberTarget.roles.remove("890075267517784116") //Owner
        memberTarget.roles.remove("890076599926521916") //Admin
        memberTarget.roles.remove("890076942164983808") //Mod
        memberTarget.roles.remove("908099650156892191") //Staff

        message.reply("You are no longer OP")
    }
}
