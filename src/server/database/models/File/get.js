const File = require ('./File.js');


const getFileByKey = async key =>
{
	return File.findOne ({ where: { key } });
};

const getRecentFiles = async limit =>
{
	return File.findAll (
	{
		limit,

		where:
		{
			showInRecentFiles: true,
		},

		order: [['createdAt', 'DESC']],
	});
};


module.exports = { getFileByKey, getRecentFiles };
