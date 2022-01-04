/* eslint-disable no-inline-comments */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

// Logger Settings
const logger = require('node-color-log');
logger.setLevel('info');
logger.setDate(() => (new Date()).toLocaleString());

// Bot Configuration Setting
const dotenv = require('dotenv'); // Import module .env
dotenv.config(); // Import .env file for config

// Import main module
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

// Commands Setup
const fs = require('fs'); // import module fs

const commandFolders = fs.readdirSync('./commands'); // read all commands folders
logger.info('⏳ Initialize modules...');

for (const module of commandFolders) { // read category folders
	logger.info(`✔️ Module ${module} has been load!`);
	logger.info(`⏳ Loading commands in ${module}...`);

	const commandFiles = fs.readdirSync(`./commands/${module}`).filter((file) => file.endsWith('.js')); // definition what is command file

	for (const commandName of commandFiles) { // read command files
		const command = require(`./commands/${module}/${commandName}`); // call up command files
		logger.info(`⏳ Loading command ${command.data.name} from ${module}...`);
		client.commands.set(command.data.name, command); // link command to interaction
		logger.info(`✔️ Command ${command.data.name} has been load!`);
	}
}

logger.info('✔️ All of modules initialize complete!');
logger.debug('🏳️ Language set Chinese');

// Event setup
const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js')); // definition what is event file

for (const file of eventFiles) { // read event file
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args)); // only run once
	}
	else {
		client.on(event.name, (...args) => event.execute(...args)); // run not only once
	}
}

// Command handling
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return; // Not command

	const command = client.commands.get(interaction.commandName);

	if (!command) return;// Not command

	try {
		await command.execute(interaction); // try to execute command
	}
	catch (error) {
		logger.warn(error); // log error info
		const ErrorReply = new MessageEmbed()
			.setColor('RED')
			.setAuthor(
				{
					name: 'G Cat Beta Version',
					url: 'https://csj.yeyunstudio.com',
					iconURL: 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png',
				},
			)
			.setTitle('❌ Error')
			.setDescription(`**${interaction.commandName}**觸發失敗!`)
			.setFooter(
				{
					name: 'Copyright © Project CSJ',
					iconURL: 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png',
				},
			);
		await interaction.reply({
			embeds: [ErrorReply],
			ephemeral: true,
		}); // send execute fail message to user
	}
});

// Login
client.login(process.env.TOKEN);
