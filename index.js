const { ActivityType, Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const app = require('express')();
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(__dirname + '/web/index.html')
});
app.get('/allquotes', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.end(fs.readFileSync('quotes.txt', 'utf-8').replace(/\n/g, '<br>'));
});
app.all(/^\/(?!(|allquotes)$).*$/iu, (req, res) => {
  res.sendFile(__dirname + '/web/404.html');
});
app.listen(443);

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

client.once('ready', () => {
  client.user.setPresence({
    activities: [
      { name: '/quotehelp', type: ActivityType.Playing }
    ],
    status: 'online'
  });
	console.log('Ready!');
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

client.login(process.env.TOKEN);