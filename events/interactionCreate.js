/* eslint-disable no-inline-comments */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

// Logger Settings
const logger = require('node-color-log');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isCommand()) return; // Not command
		logger.info(`${interaction.user.tag}在#${interaction.channel.name}使用了指令 "${interaction.commandName}"!`); // report to log
	},
};
