const sequelize = require ('./database.js');


const connect = async () =>
{
	return sequelize.authenticate ();
};

const initModels = async () =>
{
	const File = require ('./models/File/File.js');
	await File.sync ();
};


module.exports = connect ().then (() => initModels ());
