const ytdl = require('ytdl-core');
module.exports = (message, Discord, client, ...args) => {
    for(let arg of args) {
        if(arg.includes("https://www.youtube.com/watch") || arg.includes("https://youtu.be")) {
            let videoLink = arg;

            ytdl.getInfo(`${videoLink}`).then(response => {
                const videoTitle = response.videoDetails.title;
                if(videoTitle.toUpperCase().includes("ASMR")) {
                    const goldfish_asmr_detection_module = new Discord.MessageEmbed()
                        .setColor("ff2020")
                        .setAuthor({name: "MasterWarning"})
                        .setTitle("Goldfish ASMR Video Detection Module alert")
                        .setDescription(`<@${message.member.id}> has posted a link redirecting to an ASMR video.`)
                        // .addField("Username", `${message.author.username}`, true)
                        // .addField("Discriminator", `${message.author.discriminator}`, true)
                        // .addField("User ID", `${message.author.id}`, true)
                        .addField("Timestamp (message.createdAt)", `${message.createdAt}`, false)
                        .addField("Video Title", `${videoTitle}`, false)
                        .addField("Video URL", `${videoLink}`, false)
                        .setFooter({text: `Goldfish ASMR Videos Detection Module (GAVDM)`})
                        .setTimestamp();

                    message.reply({embeds: [goldfish_asmr_detection_module]})
                }
            }).catch(console.error)
        } else {
            continue;
        }
    }
}
