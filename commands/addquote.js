const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addquote')
		.setDescription('Adds a quote')
    .setDMPermission(false)
    .addStringOption((option) => {
      return option
        .setName('quote')
        .setDescription('The quote')
        .setRequired(true)
    })
    .addStringOption(o => {
      return o
        .setName('name')
        .setDescription('The person who said the quote')
        .setRequired(true)
    })
    .addIntegerOption(option => {
      return option
        .setName('year')
        .setDescription('The year the quote was said')
        .setRequired(true)
    }),
	async execute(i) {
    let quote = i.options.getString('quote'),
      name = i.options.getString('name'),
      year = i.options.getInteger('year');
    fs.appendFileSync('quotes.txt', `\n"${quote}" —${name}, ${year}`, 'utf-8');
		await i.reply(`Success! Your quote was recorded.\n||"${quote}" -${name}, ${year}||`);
	}
};