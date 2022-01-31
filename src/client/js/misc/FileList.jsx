import m from 'mithril';

import stringWidth from 'string-width';


const FILE_TRUNCATE_LEN = 30;


const FileList =
{
	createItem ( file )
	{
		let fileName = file.name;

		if ( stringWidth (fileName) >= FILE_TRUNCATE_LEN )
		{
			fileName = fileName.substr (0, FILE_TRUNCATE_LEN) + '\u2026';
		}

		return (
			<td class={'file-list-item'}>
				<a href={`/download/${file.downloadKey}`}>
					{fileName}
				</a>
			</td>
		);
	},

	view ( component )
	{
		const { files = [] } = component.attrs;
		const { length } = files;

		const rows = [];

		for ( let i = 0; i < length; i += 2 )
		{
			const row = [this.createItem (files[i])];

			if ( i < length - 1 )
			{
				row.push (this.createItem (files[i + 1]));
			}

			rows.push (<tr>{row}</tr>);
		}

		return (
			<div class='columns is-centered recent-files'>
				<table class='table'>
					{rows.length <= 0 ? 'No files to display.' : rows}
				</table>
			</div>
		);
	}
};


export default FileList;
