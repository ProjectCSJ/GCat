/* eslint-disable no-inline-comments */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

// Call up api
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

// Call up logger
const logger = require('node-color-log');

module.exports = {
	// define commands
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('Shutdown the bot'),
	defaultPermission: true, // defaule permission(set to false on this command when bot releases)
	async execute(interaction) {
		// embed builder
		const shutdown = new MessageEmbed()
			.setColor('RED')
			.setAuthor(
				'G Cat Beta Version',
				'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png',
				'https://csj.yeyunstudio.com'
			)
			.setTitle('🛑 緊急停止装置動作')
			.setDescription(`<@${interaction.client.user.id}>已被<@826327097945489408>關閉`)
			.setFooter(
				'Copyright © Project CSJ',
				'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png'
			);
		// send feedback
		await interaction.reply({
			embeds: [shutdown],
			ephemeral: false
		});
		// log shutdown been execute
		logger.info(`🛑 ${interaction.client.user.tag} 已由作者關閉`);
		// shut bot down
		process.exit();
	},
};
