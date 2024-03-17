const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

const prefix = "!"
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.sendMessage('50685305638@c.us', "bot ready")
});

client.on('message', async (msg) => {
    try {
        if (!msg.body.startsWith(prefix)) return;
        const args = msg.body.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
    
    
        // console.log(command)
        switch (command) {
            case 'clanesliga':
                let { ligaInfo } = require('./commands/clansliga')
                await client.sendMessage(msg.from, await ligaInfo())
                break;
    
            case 'gpt':
                const { ask } = require('./commands/aiask')
                const promptIask = msg.body.replace(`!${command} `, '')
                await client.sendMessage(msg.from, await ask(promptIask))
                break;

            case 'img':
                const { img_ai } = require('./commands/img-ia')
                const promptImg = msg.body.replace(`!${command} `, '')
                const aiImageMedia = await MessageMedia.fromUrl(await img_ai(promptImg));
                await client.sendMessage(msg.from, aiImageMedia)
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error)
    }

})

client.initialize();