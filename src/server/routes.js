const path = require ('path');
const rateLimit = require ('express-rate-limit');

const app = require ('./init.js');

const { limits } = require ('../../cfg/server.config.js');

const { getFileByKey, getRecentFiles } = require ('./database/models/File/get.js');

const createFileEntry = require ('./database/models/File/create.js');
const deleteFileEntry = require ('./database/models/File/delete.js');


const RATE_LIMIT_MESSAGE = 'Too many requests at once! Please wait and try again.';

const uploadLimit = rateLimit (
{
	windowMs: limits.uploadMS,
	max: limits.uploadsPerMS,
	message: RATE_LIMIT_MESSAGE,
});


const downloadLimit = rateLimit (
{
	windowMs: limits.downloadMS,
	max: limits.downloadsPerMS,
	message: RATE_LIMIT_MESSAGE,
});

const fileListLimit = rateLimit (
{
	windowMs: limits.fileListMS,
	max: limits.fileListPerMS,
	message: RATE_LIMIT_MESSAGE,
});


app.get ('/download/:key', downloadLimit, ( req, res ) =>
{
	getFileByKey (req.params.key).then (file =>
	{
		if ( file === null )
		{
			res.status (404).redirect ('/404');
		}
		else
		{
			const { data, mimetype, name } = file.dataValues;

			res.status (200)
				.type (mimetype)
				.set ('Content-Disposition', `attachment; filename="${name}"`)
				.send (data);
		}
	})
	.catch (error =>
	{
		res.sendStatus (500);
	});
});

app.get ('/delete/:key', ( req, res ) =>
{
	if ( !req.query.deleteKey)
	{
		res.status (400).send ('Deletion key was not supplied.');
	}
	else
	{
		deleteFileEntry (req.params.key, req.query.deleteKey).then (success =>
		{
			if ( success )
			{
				res.sendStatus (200);
			}
			else
			{
				res.status (404).redirect ('/404');
			}
		})
		.catch (error =>
		{
			res.sendStatus (500);
		});
	}
});

app.get ('/recent', fileListLimit, ( req, res ) =>
{
	getRecentFiles (limits.fileListPage).then (files =>
	{
		const fileData = [];

		const { length } = files;

		for ( let i = 0; i < length; i++ )
		{
			const { key, name, createdAt } = files[i];

			fileData.push ({ downloadKey: key, name, createdAt });
		}

		res.status (200).send (fileData);
	})
	.catch (error =>
	{
		res.sendStatus (500);
	});
});

app.get ('/*', ( req, res ) =>
{
	res.sendFile ('index.html', { root: path.join (__dirname, '../client') });
});

app.post ('/upload', uploadLimit, ( req, res ) =>
{
	const { files = {} } = req;

	const keys = Object.keys (files);

	if ( keys.length <= 0 )
	{
		return res.status (400).send ('No file was uploaded.');
	}

	if ( keys.length > 1 )
	{
		return res.status (400).send ('Multi-file upload is not supported.');
	}

	let options;

	try
	{
		options = JSON.parse (req.body.options);
	}
	catch ( error )
	{
		return res.status (400).send ('Error parsing JSON data');
	}

	const { data, mimetype, name, size } = files[keys[0]];

	if ( size <= 0 )
	{
		return res.status (400).send ('Cannot upload an empty file.');
	}

	const properties =
	{
		uploaderIP: req.ip,
		hasDeleteKey: !!options.hasDeleteKey,
		showInRecentFiles: !!options.showInRecentFiles,

		data,
		mimetype,
		name,
	};

	createFileEntry (properties).then (file =>
	{
		if ( file === null )
		{
			res.sendStatus (400);
		}
		else
		{
			const { key, deleteKey = null } = file.dataValues;

			res.status (200).send ({ downloadKey: key, deleteKey });
		}
	})
	.catch (error =>
	{
		res.sendStatus (500);
	});
});

app.use (( error, req, res, next ) =>
{
	if ( error )
	{
		return res.sendStatus (400);
	}

	return next ();
});
