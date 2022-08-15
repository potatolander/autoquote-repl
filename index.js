const { ActivityType, Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { inviteLink } = require('./config.json');

const app = require('express')();
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(__dirname + '/web/index.html')
});
app.get('/allquotes', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.end(`
<!DOCTYPE html>
<html lang='en-us'>
<head>
<title>AutoQuote | All Quotes</title>
<style>
body {
background-color: #000000;
color: #f5f5f5;
font-family: sans-serif;
font-size: 1.25em;
line-height: 1.75em;
}
</style>
</head>
<body>
${fs.readFileSync('quotes.txt', 'utf-8').replace(/\n/g, '<br>')}
</body>
</html>
  `);
});
app.get('/invite', (req, res) => {
  res.redirect(inviteLink);
});
app.all(/^\/(?!(|allquotes|invite)$).*$/iu, (req, res) => {
  res.sendFile(__dirname + '/web/404.html');
});

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds
	]
});


client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on('ready', () => {
  console.log('Ready!');
  client.user.setPresence({
    activities: [
      {
        name: '/quotehelp',
        type: ActivityType.Playing
      }
    ],
    status: 'online'
  });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (e) {
		console.error(e);
		await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
	}
});

client.login(process.env.TOKEN).catch(error => console.log);

app.listen(443);