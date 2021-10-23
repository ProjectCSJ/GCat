/* eslint-disable max-len */
/* eslint-disable no-tabs */
const logger = require('node-color-log');
module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const dotenv = require('dotenv');
		dotenv.config();

		const DB_HOST = process.env.DB_HOST;
		const DB_USR = process.env.DB_USR;
		const DB_PWD = process.env.DB_PWD;

		const mysql = require('mysql');

		const DB = mysql.createConnection({
			host: DB_HOST,
			user: DB_USR,
			password: DB_PWD,
		});

		logger.info(`正在連線到${DB_HOST}...`);

		DB.connect((err) => {
			if (err) {throw err;}
			logger.info(`已成功連線至${DB_HOST}!`);
			logger.info(`正在結束${DB_HOST}連線...`);
			DB.end();
			logger.info(`已自${DB_HOST}斷線!`);

			logger.info(`正在嘗試以${client.user.tag}的身分登入...`);
			logger.info('已成功登入');
			logger.info(`使用者名稱:${client.user.tag}!`);
		});
	},
};
