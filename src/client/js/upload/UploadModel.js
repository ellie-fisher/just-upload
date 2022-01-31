import { has } from '~/util.js';


const uploadOptions = Object.freeze (
{
	hasDeleteKey: Object.freeze (
	{
		type: 'boolean',
		label: 'Generate delete key',
		defaultValue: true,
	}),

	showInRecentFiles: Object.freeze (
	{
		type: 'boolean',
		label: 'Show in recent files',
		defaultValue: false,
	}),
});


const UploadModel =
{
	uploadOptions,

	resetToDefaults ()
	{
		UploadModel.file = null;
		UploadModel.options = {};
		UploadModel.downloadKey = '';
		UploadModel.deleteKey = '';
		UploadModel.error = '';
		UploadModel.state = 'ready';

		for ( let key in uploadOptions )
		{
			UploadModel.options[key] = uploadOptions[key].defaultValue;
		}
	},

	setOption ( key, value )
	{
		if ( has (this.options, key) )
		{
			this.options[key] = value;
		}
	},

	getOption ( key )
	{
		return has (this.options, key) ? this.options[key] : null;
	},
};

UploadModel.resetToDefaults ();  // Initialize fields


export default UploadModel;
