const config = require ('../../cfg/server.config.js');
const app = require ('./init.js');

require ('./routes.js');

require ('./database/init.js').then (() =>
{
	app.listen (config.port, () =>
	{
		console.log (`File hosting server is now running on port ${config.port}`);
	});
})
.catch (error =>
{
	console.error ('Could not connect to the database:', error);
});
