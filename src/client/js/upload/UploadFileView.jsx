import m from 'mithril';
import filesize from 'filesize';

import UploadModel from '~/upload/UploadModel.js';
import UploadController from '~/upload/UploadController.js';

import { limits } from '~/cfg/common.config.js';

const maxFileSize = limits.fileSize;


const UploadFileView =
{
	oninit ()
	{
		UploadModel.resetToDefaults ();
	},

	view ()
	{
		const options = [];

		const isLoading = UploadModel.state === 'loading';
		const isUploading = UploadModel.state === 'uploading';

		const disableControls = isLoading || isUploading;

		const { uploadOptions, file } = UploadModel;

		for ( let key in uploadOptions )
		{
			const { label } = uploadOptions[key];

			options.push (
				<div class='control'>
					<label class='checkbox'>
						<input
							type='checkbox'
							name={key}
							checked={UploadModel.getOption (key)}
							onchange={UploadController.onOptionChanged}
							disabled={disableControls}
						/>

						{' ' + label}
					</label>
				</div>
			);
		}

		return (
			<div class='p-1'>
				<h4 class='title is-4 has-text-centered'>Upload File</h4>
				<div class='columns is-centered'>
				{
					isLoading
						? <div class='loading-spinner mt-4 mb-2' />
						: <div class='file column'>
							<div class='has-text-centered mb-5'>
								<small>{file === null ? 'No file selected.' : file.name}</small>
							</div>

							<label class='file-label columns is-centered mb-2'>
								<input
									class='file-input'
									type='file'
									oninput={UploadController.onFileInput}
									onchange={UploadController.onFileChanged}
									disabled={disableControls}
								/>
								<div class='file-cta'>Choose File</div>
							</label>
						</div>
				}
				</div>

				{
					UploadModel.error === ''
						? ''
						: <div class='columns is-centered'>
							<div class='column is-narrow'>
								<div class='message is-danger'>
									<div class='message-body p-2 pl-4 pr-4'>
										{UploadModel.error}
									</div>
								</div>
							</div>
						</div>
				}

				<div class='columns is-centered'>
					<div class='column is-narrow'>{options}</div>
				</div>

				<div class='columns is-centered'>
					<div class='column is-narrow'>
						<small>Max file size is {filesize (maxFileSize)}</small>
					</div>
				</div>

				<div class='columns is-centered'>
					<div class='column is-narrow'>
						<button
							class={'button is-primary' + (isUploading ? ' is-loading' : '')}
							onclick={UploadController.onClickUpload}
							disabled={file === null || UploadModel.state !== 'loaded'}
						>
							Upload
						</button>
					</div>
				</div>
			</div>
		);
	},
};


export default UploadFileView;
