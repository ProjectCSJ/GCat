/* eslint-disable max-len */
/* eslint-disable no-tabs */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const logger = require('node-color-log');
module.exports = {
	defaultPermission: true,
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('Shutdown the bot'),
	async execute(interaction) {
		const shutdown = new MessageEmbed()
			.setColor('RED')
			.setAuthor('G Cat Beta Version', 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png', 'https://csj.yeyunstudio.com')
			.setTitle('System Offlien')
			.setDescription('Bot just shutdown by owner')
			.setFooter('Copyright © Project CSJ', 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png');
		await interaction.reply({ embed: [shutdown] });
		logger.info('Bot Has Been Stopped by Owner');
		process.exit();
	},
};
