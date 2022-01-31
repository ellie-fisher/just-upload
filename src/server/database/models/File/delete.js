const File = require ('./File.js');


const deleteFileEntry = async ( key, deleteKey = null ) =>
{
	if ( deleteKey === null )
	{
		return false;
	}

	return File.destroy ({ where: { key, deleteKey }}).then (numDeleted =>
	{
		return numDeleted > 0;
	});
};


module.exports = deleteFileEntry;
