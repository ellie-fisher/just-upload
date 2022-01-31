import m from 'mithril';
import copy from 'copy-to-clipboard';

import UploadModel from '~/upload/UploadModel.js';


const COPY_TIMEOUT = 1100;


const UploadSuccessView =
{
	oninit ()
	{
		this.copyTimeout = 0;
	},

	copyLink ( link )
	{
		if ( this.copyTimeout <= 0)
		{
			copy (window.location.host + link);

			const self = this;

			this.copyTimeout = setTimeout (() =>
			{
				self.copyTimeout = 0;
				m.redraw ();
			}, COPY_TIMEOUT);
		}
	},

	view ()
	{
		const { downloadKey = null, deleteKey = null } = UploadModel;

		let downloadLink = '';
		let deleteLink = '';

		if ( downloadKey !== null )
		{
			downloadLink = `/download/${downloadKey}`;
		}

		if ( deleteKey !== null && downloadKey !== null )
		{
			deleteLink = `/delete/${downloadKey}?deleteKey=${deleteKey}`;
		}

		const isCopying = this.copyTimeout > 0;
		const self = this;

		return (
			<div class='has-text-centered'>
				<div class='columns is-centered is-multiline pt-2'>
					<div class='column'>
						<label>Download Link: </label>
						<a href={downloadLink}>{window.location.host + downloadLink}</a>
					</div>
				</div>

				<hr class='mt-2 ml-6 mr-6' />

				<div class='columns is-centered is-multiline pb-3'>
					<div class='column is-narrow'>
						<button
							class={'button button-transition ' + (isCopying ? '' : 'is-danger')}
							onclick={() => self.copyLink (deleteLink)}
							disabled={isCopying}
						>
							{isCopying ? 'Copied Link' : 'Copy Deletion Link'}
						</button>
					</div>
					<div class='column is-narrow'>
						<button
							class='button is-primary'
							onclick={() => m.route.set ('/')}
						>
							Upload Another File
						</button>
					</div>
				</div>
			</div>
		);
	},
};


export default UploadSuccessView;
