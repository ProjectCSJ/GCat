/* eslint-disable max-len */
/* eslint-disable no-tabs */
const logger = require('node-color-log');
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isCommand()) return;
		logger.info(`${interaction.user.tag}在#${interaction.channel.name}使用了指令!`);
	},
};
