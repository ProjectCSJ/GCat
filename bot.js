/* eslint-disable max-len */
/* eslint-disable no-tabs */
const logger = require('node-color-log');
logger.setLevel('info');
logger.setDate(() => (new Date()).toLocaleString());
// Setting Configuration
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');

// Modules Import
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');
logger.info('⏳ Initialize modules...');
for (const module of commandFolders) {
	logger.info(`✔️ Module ${module} has been load!`);
	logger.info(`⏳ Loading commands in ${module}`);
	const commandFiles = fs.readdirSync(`./commands/${module}`).filter((file) => file.endsWith('.js'));
	for (const commandName of commandFiles) {
		const command = require(`./commands/${module}/${commandName}`);
		logger.info(`⏳ Loading command ${module}/${command.data.name}...`);
		client.commands.set(command.data.name, command);
		logger.info(`✔️ Command ${module}/${command.data.name} has been load!`);
	}
}
logger.info('✔️ All of modules initialize complete!');
logger.debug('🏳️ Language set Chinese');

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		logger.warn(error);
		await interaction.reply({ content: `**${interaction.commandName}**觸發失敗!`, ephemeral: true });
	}
});

client.login(process.env.TOKEN);
