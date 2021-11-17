/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable no-inline-comments */

// Logger Settings
const logger = require('node-color-log');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		// read settings
		const dotenv = require('dotenv');
		dotenv.config();

		// define variable
		const DB_HOST = process.env.DB_HOST;
		const DB_USR = process.env.DB_USR;
		const DB_PWD = process.env.DB_PWD;

		// test sql connect
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
			logger.info(`✔️已成功連線至${DB_HOST}!`);
			logger.info(`⏳正在結束${DB_HOST}連線...`);
			DB.end(); // test complete, disconnect to db
			logger.info(`✔️已自${DB_HOST}斷線!`);

			client.user.setPresence({
				activities: [{
					name: 'Private Beta',
					type: 'PLAYING'
				}],
				status: 'idle'
			});

			logger.info(`⏳正在嘗試以${client.user.tag}的身分登入...`); // login to user
			logger.info('✔️已成功登入!');
			logger.info(`使用者名稱:${client.user.tag}!`);
		});
	},
};
