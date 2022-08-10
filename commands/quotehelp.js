const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quotehelp')
		.setDescription('Displays help for AutoQuote'),
	async execute(interaction) {
		await interaction.reply(`
\`/quotehelp\`: Displays this help message
\`/addquote\`: Adds a new quote
\`/allquotes\`: Displays a link to the quotebag
`);
	}
};