const { SlashCommandBuilder } = require('discord.js');
// https://discordjs.guide/popular-topics/builders.html
const { bold, hyperlink, italic } = require('discord.js')
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('allquotes')
		.setDescription('Displays all quotes'),
	async execute(interaction) {
		await interaction.reply(bold(`Viewer discretion advised.\nBy following the link, you agree that you will ${italic('not press charges against anyone for anything')} caused by your following the link. For the safety of your brain cells and sanity, there will be a delay of approximately 10 seconds until you will be given the link to the quotebag.`));
    setTimeout(async () => {
      await interaction.followUp('If you still want your brain screwed over, you can view the quotebag at https://AutoQuote.IndigoMotorcycl.repl.co/allquotes.');
    }, 10000);
	}
};