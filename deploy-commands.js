/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable no-inline-comments */

// Logger Settings
const logger = require('node-color-log');
logger.setLevel('info');
logger.setDate(() => (new Date()).toLocaleString());

// Setting Configutation
const dotenv = require('dotenv');
dotenv.config();

// Module Import
const fs = require('fs'); // file reader
const { REST } = require('@discordjs/rest'); // discord api
const { Routes } = require('discord-api-types/v9'); // discord api

const commands = []; // initialize empty container

// Read files
const commandFolders = fs.readdirSync('./commands'); // read all commands folders
for (const folder of commandFolders) { // read category folders
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js')); // definition what is command file
	for (const file of commandFiles) { // read command files
		const command = require(`./commands/${folder}/${file}`); // call up command files
		commands.push(command.data.toJSON()); // put command information to container
	}
}

// Deploy
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN); // call up api
(async () => {
	try {
		logger.debug('Started refreshing application (/) commands.');
		await rest.put( // registration
			Routes.applicationCommands(process.env.ClientId),
			{ body: commands },
		);
		logger.debug('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		logger.error(error);
	}
})();
