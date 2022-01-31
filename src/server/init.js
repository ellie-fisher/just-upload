const path = require ('path');

const express = require ('express');
const bodyParser = require ('body-parser');
const fileUpload = require ('express-fileupload');

const { limits } = require ('../../cfg/common.config.js');
const { uploadTimeout } = require ('../../cfg/server.config.js');

const app = express ();

app.use (bodyParser.json ());

app.use (fileUpload (
{
	uploadTimeout,

	limits:
	{
		fileSize: limits.fileSize,
	},

	abortOnLimit: true,
}));

app.use ('/', express.static (path.join (__dirname, '../client')));


module.exports = app;
