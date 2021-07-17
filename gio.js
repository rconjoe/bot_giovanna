require('dotenv').config()
const tmi = require('tmi.js')
const fs = require('fs-extra')
const client = new tmi.Client({
    options: { debut: true },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: ['rcon_joe']
})
let buffer = new Buffer.alloc(1024)
client.connect()

client.on('connected', (address, port) => {
    console.log(`connected at ${address}:${port}`)
    client.say('#rcon_joe', `*stumbles in* I'm here I'm here. nodemon restarted me. @rcon_joe must have changed something...`)
})

client.on('message', (channel, tags, message, self) => {
    if (self || !message.startsWith('!')) {
        return
    }
    const args = message.slice(1).split(' ')
    const command = args.shift().toLowerCase()

    if (command === 'echo') {
        client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`)
    }
    else if (command === 'hello') {
        console.log(channel)
        client.say(channel, `@${tags.username}, sup l33t gaemer`)
    }
    else if (command === 'dice') {
        const result = Math.floor(Math.random() * 6) + 1
        client.say(channel, `@${tags.username} rolled a ${result}...`)
    }
    else if (command === 'project') {
        client.say(channel, `We're building a stack for @fragadelphia! #saveNACS Here is a basic diagram of the project so far: https://bit.ly/36gRipC. Here is the Github project: https://bit.ly/3jMWlGg. VSCode users can use the !liveshare command to join me in editor.`)
    }
    else if (command === 'fc') {
        client.say(channel, '4571-4110-9151')
    }
    else if (command === 'socials') {
        client.say(channel, `https:twitter.com/rconjoe || https://instagr.am/trogdoor || https://blog.rconjoe.com || https://github.com/rconjoe || https://discord.gg/GM5TKXHE4X`)
    }
    else if (command === 'discord') {
        client.say(channel, 'https://discord.gg/GM5TKXHE4X')
    }
    else if (command === 'liveshare') {
        client.say(channel, `Here's a link to join my VSCode session, read-only. If you don't know how to use this, google VSCode Live Share Extension. https://prod.liveshare.vsengsaas.visualstudio.com/join?403A2B141843FB3E5D0498777606BE765FE3`)
    }
    else if (command === 'lgsm' || command === 'linuxgsm') {
        client.say(channel, 'https://linuxgsm.com')
    }
    else if (command === 'flippy') {
        fs.readJson('./flippy.json', (err, packageObj) => {
            if (err) console.error(err)
            console.log(packageObj.flippyCount)
            let flippyCount = packageObj.flippyCount + 1
            client.say(channel, `@FlippyBitsGG MASTER BUTYON PUSH APPROXIMETLEY ${flippyCount} TIMES.!!>1!`)
            fs.writeJson('flippy.json', { flippyCount: flippyCount })
            .then(() => console.log(`success: ${flippyCount}`))
            .catch(err => console.error(err))
        })
    }
    else if (command === 'commands') {
        client.say(channel, `Things I can do rn: \n!commands
        !hello
        !echo
        !dice
        !project
        !fc
        !socials
        !discord
        !liveshare
        !lgsm
        !flippy`)
    }
})
