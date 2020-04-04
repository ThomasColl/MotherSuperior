const { Client } = require("discord.js");
const { config } = require("dotenv");
var sig = '-';

const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
});

client.on("ready", () => {
    console.log("The Mother Superior is here. You better prepare for some swift discipline");

    // const punishmentRole = client.guild.roles.cache.find(role => role.name === "Pennant");
    // if (!punishmentRole) {
    //     console.log("There is no Pennant role in existence. If this role isnt there it wont work");
    // }

    // const logChannel = client.guild.channels.cache.find(channel => channel.name === "mother-superiors-logs");
    // if (!logChannel) {
    //     console.log("There is no channel called mother-superiors-logs. You will need to create one in order for this to work");
    // }

});

client.login(process.env.TOKEN);

client.on('message', async message => {
    if (checkConditionsForMessage(message, sig)) {
        console.log(`${message.author.username} said: ${message.content}`);

        var args = message.content.substring(1).split(' ');
        var cmd = args[0];

        switch (cmd) {
            case 'punish':
                if (message.member.hasPermission('ADMINISTRATOR')) {
                    console.log('User is an admin.');

                    const user = message.mentions.users.first();
                    if (user) {
                        const member = message.guild.member(user);

                        if (member) {
                            const msg = await message.channel.send("By the grace of God you will suffer <@" + user.id + ">");
                            var usersRoles = member.roles._roles;
                            var punishRole = member.guild.roles.cache.find(role => role.name === "Pennant");

                            if (usersRoles && punishRole) {
                                var removeRoles = member.roles.remove(usersRoles);
                                var addPunish = member.roles.add(punishRole);
                                const waitTime = args[2];

                                var reason = args.splice(3).join(' ');

                                await sleep(waitTime);

                                var justThePunishment = member.roles._roles;
                                var removePunishment = member.roles.remove(justThePunishment);
                                await sleep('1~s');
                                console.log(usersRoles);
                                var returnRoles = member.roles.add(usersRoles);

                                const exit = await message.channel.send("I hope you learned your lesson you dirty sinner <@" + user.id + ">");

                                const logMessage = "A student was sentenced to the lash \n Student: " + user.username + "\n Time: " + waitTime + "\n Reason: " + reason;
                                const logChannel = member.guild.channels.cache.find(channel => channel.name === "mother-superiors-logs");
                                console.log(logChannel);
                                logChannel.send(logMessage);

                            }
                        }
                    } else {
                        const msg = await message.channel.send("There is no sinner to punish here");
                    }

                } else {
                    const msg = await message.channel.send("You naughty little boy, you aren't ordained");
                }
                break;
        }
    }
});

function checkConditionsForMessage(message, sig) {
    if (message.content.substring(0, 1) != sig) { return false; }
    if (message.author.bot) { return false; }
    if (!message.guild) { return false; }

    return true;
}

function sleep(time) {
    var spl = time.split('~');
    var ms = spl[0];
    var mod = spl[1];

    console.log(mod);

    switch (mod) {
        case 's':
            ms *= 1000;
            break;
        case 'm':
            ms *= 1000 * 60;
            break;
        case 'h':
            ms *= 1000 * 60 * 60;
            break;
        case 'd':
            ms *= 1000 * 60 * 60 * 24;
            break;
    }
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}