const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quotehelp')
		.setDescription('Displays help for AutoQuote'),
	async execute(interaction) {
		await interaction.reply(`
\`/addquote\`:\tAdds a quote
\`/allquotes\`:\tProvides a link to the quotebag
\`/announce\`:\tCreates an announcement in the specified channel
\`/quotehelp\`:\tDisplays help for AutoQuote
`);
	}
};