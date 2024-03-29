/* eslint-disable no-inline-comments */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	// define commands
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	defaultPermission: true, // defaule permission
	async execute(interaction) {
		// embed builder
		const ping = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(
				{
					name: 'G Cat Beta Version',
					url: 'https://csj.yeyunstudio.com',
					iconURL: 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png',
				},
			)
			.setTitle('🏓 Pong!')
			.setDescription(`🕒 延遲${Math.abs(Date.now() - interaction.createdTimestamp)}ms.`)
			.setFooter(
				{
					name: 'Copyright © Project CSJ',
					iconURL: 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png',
				},
			);
		interaction.reply({
			embeds: [ping],
			ephemeral: false,
		}); // send feedback
	},
};
