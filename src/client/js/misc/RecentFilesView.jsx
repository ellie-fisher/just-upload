import m from 'mithril';

import AppModel from '~/app/AppModel.js';
import AppController from '~/app/AppController.js';

import FileList from '~/misc/FileList.jsx';


const RecentFilesView =
{
	oninit ()
	{
		AppController.getRecentFiles ();
	},

	view ()
	{
		const showLoading = AppModel.isLoadingFiles && AppModel.files.length <= 0;

		return (
			<div class='p-1'>
				<h4 class='title is-4 has-text-centered'>Recently Upload Files</h4>

				<div class='p-2'>
				{
					showLoading
						? <div class='columns is-centered'>
							<div class='column is-narrow'>
								<div class='loading-spinner' />
							</div>
						</div>
						: <FileList files={AppModel.files} />
				}
				</div>
			</div>
		);
	},
};


export default RecentFilesView;
