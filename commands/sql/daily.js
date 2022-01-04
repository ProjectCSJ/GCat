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
const logger = require('node-color-log');
const date = new Date();

module.exports = {
	// define commands
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('領取每日獎勵'),
	defaultPermission: true, // defaule permission
	async execute(interaction) {
		const daily = new MessageEmbed();
		const mysql = require('mysql');
		const DB = mysql.createConnection({
			host: DB_HOST,
			user: DB_USR,
			password: DB_PWD,
		});
		logger.info(`⏳正在連線到${DB_HOST}...`);
		DB.connect((err) => {
			if (err) {
				logger.error(err); // when error throw error
			}
			const now = date.toLocaleString();
			logger.info(`✔️已成功連線至${DB_HOST}!`);
			logger.info(`⏳正在查詢${interaction.user.tag}的每日獎勵狀態`);
			DB.query(`SELECT "UID", "LastUse" FROM "gcatbeta.daily_check" WHERE UID = "${interaction.user.id}";`, (err, rows) => {
				if (err) {throw err;}
				if (rows.length < 1) {
					DB.query(`INSERT INTO "gcatbeta.daily_check" ("UID", "LastUse") VALUES ("${interaction.user.id}", "${now}");`);
					DB.query(`SELECT "UID", "Gcoin" FROM "gcatbeta.item" WHERE UID = "${interaction.user.id}";`, (err, row) => {
						if (err) {throw err;}
						if (row.length < 1) {
							DB.query(`INSERT INTO "gcatbeta.item" ("UID", "Gcoin") VALUES ("${interaction.user.id}", 2000);`);
						}
						else {
							const NewGcoin = row[Gcoin] + 2000;
							DB.query(`UPDATE "gcatbeta.item" SET "Gcoin" = ${NewGcoin} WHERE ""UID" = "${interaction.user.id}");`);
						}
					});
					DB.query(`INSERT INTO "daily_check" ("UID", "LastUse") VALUES ('${interaction.user.id}', '${now}');`);
					daily
						.setColor('#ffe26f')
						.setAuthor(
							{
								name: 'G Cat Beta Version',
								url: 'https://csj.yeyunstudio.com',
								iconURL: 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png',
							},
						)
						.setTitle(`💰 <@${interaction.user.id}> 賺取了每日獎勵 meow!`)
						.setDescription(`<@${interaction.user.id}> 現有 ? Gcoin`)
						.setFooter(
							{
								name: 'Copyright © Project CSJ',
								iconURL: 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png',
							},
						);
				}
				else if (rows.length) {
					DB.query('');
				}
				else {
					logger.info('');
				}
			});
			logger.info(`✔️查詢${interaction.user.tag}的每日獎勵狀態完畢!`);
			logger.info(`⏳正在結束${DB_HOST}連線...`);
			DB.end(); // test complete, disconnect to db
			logger.info(`✔️已自${DB_HOST}斷線!`);
		});
		// embed builder
		// send feedback
		await interaction.reply({
			embeds: [daily],
			ephemeral: true,
		});
	},
};
