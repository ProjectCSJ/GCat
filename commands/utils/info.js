/* eslint-disable no-inline-comments */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

// Call up api
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const logger = require('node-color-log');

module.exports = {
	// define commands
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get infomation')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('user')
				.setDescription('Info about a user')
				.addUserOption(
					(option) =>
						option.setName('target')
							.setDescription('The user')
							.setRequired(true)
			)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('server')
				.setDescription('Info about the server')),
	defaultPermission: true, // defaule permission
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'user') { // when sub command is user
			if (interaction.options.getUser('target') === null || interaction.options.getUser === undefined) {
				const user = interaction.user
			} else {
				const user = interaction.options.getUser('target'); // setup target
			}
			// embed builder
			const userinfo = new MessageEmbed()
				.setColor('RANDOM')
				.setTitle(`這是${user.username}的詳細資訊`)
				.setAuthor(
					'G Cat Beta Version',
					'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png',
					'https://csj.yeyunstudio.com'
				)
				.setDescription('由Project CSJ使用Discord.js生成')
				.setThumbnail(`${user.avatarURL({ dynamic: true })}`)
				.addFields(
					{
						name: '使用者名稱',
						value: `${user.username}`,
						inline: false,
					},
					{
						name: '完整使用者名稱',
						value: `${user.tag}`,
						inline: false,
					},
					{
						name: '使用者ID',
						value: `${user.id}`,
						inline: false,
					},
					{
						name: '帳號建立日期',
						value: `${user.createdAt}`,
						inline: false,
					},
				)
				.setFooter(
					'Copyright © Project CSJ',
					'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png'
				);
			interaction.reply({
				embeds: [userinfo],
				ephemeral: true
			}); // send feedback
		}
		else { // when sub command is guild
			const guild = interaction.guild; // setup target
			const afk = guild.afkTimeout / 60; // formate afk time
			// embed builder
			const guildinfo = new MessageEmbed()
				.setColor('RANDOM')
				.setTitle(`這是${guild.name}的詳細資訊`)
				.setAuthor(
					'G Cat Beta Version',
					'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png',
					'https://csj.yeyunstudio.com'
				)
				.setDescription('由Project CSJ使用Discord.js生成')
				.setThumbnail(`${guild.iconURL({ dynamic: true })}`)
				.addFields(
					{
						name: '伺服器名稱',
						value: `${guild.name}`,
						inline: false,
					},
					{
						name: '伺服器說明',
						value: `${guild.description}`,
						inline: false,
					},
					{
						name: '伺服器ID',
						value: `${guild.id}`,
						inline: false,
					},
					{
						name: '伺服器擁有者',
						value: `<@${guild.ownerId}>`,
						inline: false,
					},
					{
						name: '伺服器掛機頻道',
						value: `${guild.afkChannel}`,
						inline: false,
					},
					{
						name: '伺服器掛機定義',
						value: `無語音活動${afk}分鐘後`,
						inline: false,
					},
					{
						name: '伺服器使用者數',
						value: `${guild.memberCount}`,
						inline: false,
					},
					/*
					{
						name: '伺服器機器人數',
						value: `${BotCount}`,
						inline: false,
					},
					{
						name: '伺服器身分組數',
						value: `${RoleCount}`,
						inline: false,
					},
					{
						name: '伺服器文字頻道數',
						value: `${TextChannelCount}`,
						inline: false,
					},
					{
						name: '伺服器語音頻道數',
						value: `${VoiceChannelCount}`,
						inline: false,
					},
					{
						name: '伺服器舞台頻道數',
						value: `${StageChannelCount}`,
						inline: false,
					},
					*/
					{
						name: '伺服器加成等級',
						value: `${guild.premiumTier}`,
						inline: false,
					},
					{
						name: '伺服器加成數',
						value: `${guild.premiumSubscriptionCount}`,
						inline: false,
					},
					{
						name: '伺服器建立日期',
						value: `${guild.createdAt}`,
						inline: false,
					},
				)
				.setFooter(
					'Copyright © Project CSJ',
					'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png'
				);
			interaction.reply({
				embeds: [guildinfo],
				ephemeral: true
			}); // send feedback
		}
	},
};
