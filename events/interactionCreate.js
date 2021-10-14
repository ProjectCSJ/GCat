/* eslint-disable max-len */
/* eslint-disable no-tabs */

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isCommand()) return;
		console.log(`${interaction.user.tag}在#${interaction.channel.name}使用了指令!`);
	},
};
