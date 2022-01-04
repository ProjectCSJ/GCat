/* eslint-disable no-inline-comments */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

// Bot Configuration Setting
const dotenv = require('dotenv'); // Import module .env
dotenv.config(); // Import .env file for config

const DB_HOST = process.env.DB_HOST;
const DB_USR = process.env.DB_USR;
const DB_PWD = process.env.DB_PWD;

// Import main module
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	// define commands
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('Shutdown the bot'),
	defaultPermission: true, // defaule permission(set to false on this command when bot releases)
	async execute(interaction) {
		// embed builder
		const shutdown = new MessageEmbed()
			.setColor('#ffe26f')
			.setAuthor(
				{
					name: 'G Cat Beta Version',
					url: 'https://csj.yeyunstudio.com',
					iconURL: 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png',
				},
			)
			.setTitle('🛑 緊急停止装置動作')
			.setDescription(`<@${interaction.client.user.id}>已被<@826327097945489408>關閉`)
			.setFooter(
				{
					name: 'Copyright © Project CSJ',
					iconURL: 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png',
				},
			);
		// send feedback
		await interaction.reply({
			embeds: [shutdown],
			ephemeral: false,
		});
		// log shutdown been execute
		logger.info(`🛑 ${interaction.client.user.tag} 已由作者關閉`);
		// shut bot down
		process.exit();
	},
};

