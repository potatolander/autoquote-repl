const { SlashCommandBuilder, channelMention } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('simpoll')
		.setDescription('A simple yes-or-no poll')
    .setDMPermission(false)
    .addChannelOption(option => {
      return option
        .setName('channel')
        .setDescription('The channel in which to post the poll')
        .setRequired(true)
    })
    .addStringOption(option => {
      return option
        .setName('question')
        .setDescription('The question to be asked in the poll')
        .setRequired(true)
    })
    .addBooleanOption(option => {
      return option
        .setName('ping')
        .setDescription('Ping @everyone?')
        .setRequired(false)
    }),
	async execute(interaction) {
    let msgContent = 'Pay attention.'
    if (interaction.options.getBoolean('ping')) {
      msgContent = '@everyone pay attention.';
    }
    await interaction.reply({
      content: `Sending your poll in ${channelMention(interaction.options.getChannel('channel').id)}`,
      ephemeral: true
    });
		await interaction.options.getChannel('channel').send({
      content: msgContent,
      embeds: [{
        color: 0xffff00,
        title: `Poll by ${interaction.user.tag}`,
        description: interaction.options.getString('question')
      }]
    }).then(m => {
      m.react(':thumbsup:');
      m.react(':thumbsdown:');
      m.react(':face_with_monocle:');
    });
	}
};