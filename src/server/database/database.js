const config = require ('../../../cfg/database.config.js');

const { Sequelize } = require ('sequelize');


const sequelize = new Sequelize (config.name, config.username, config.password,
{
	host: config.host,
	dialect: config.dialect,
});


module.exports = sequelize;
