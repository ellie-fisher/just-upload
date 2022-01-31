const sequelize = require ('../../database.js');

const { Sequelize, DataTypes } = require ('sequelize');


const File = sequelize.define ('File',
{
	id:
	{
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		unique: true,
		allowNull: false,
	},

	data:
	{
		type: DataTypes.BLOB ('long'),
		allowNull: false,
	},

	mimetype:
	{
		type: DataTypes.STRING (127),
		defaultValue: null,
		allowNull: true,
	},

	name:
	{
		type: DataTypes.STRING (255),
		allowNull: false,
	},

	key:
	{
		type: DataTypes.STRING (8),
		unique: true,
		allowNull: false,
	},

	deleteKey:
	{
		type: DataTypes.STRING (24),
		defaultValue: null,
		unique: true,
		allowNull: true,
	},

	uploaderIP:
	{
		type: DataTypes.INET,
		allowNull: false,
	},

	showInRecentFiles:
	{
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
},
{
	freezeTableName: true,
});


module.exports = File;
