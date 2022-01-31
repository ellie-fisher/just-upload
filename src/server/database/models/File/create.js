const randomString = require ('crypto-random-string');

const File = require ('./File.js');


const createFileEntry = async properties =>
{
	const
	{
		data = null,
		mimetype = null,
		name = null,
		uploaderIP = null,
		hasDeleteKey,
	}
	= properties;

	if ( data === null || mimetype === null || name === null || uploaderIP === null )
	{
		return null;
	}

	const entryProps =
	{
		key: randomString ({ length: 8, type: 'alphanumeric' }),
		...properties,
	};

	if ( hasDeleteKey )
	{
		entryProps.deleteKey = randomString ({ length: 24, type: 'alphanumeric' });
	}

	return await File.create (entryProps);
};


module.exports = createFileEntry;
