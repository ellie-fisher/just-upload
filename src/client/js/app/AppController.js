import m from 'mithril';
import axios from 'axios';

import AppModel from '~/app/AppModel.js';


const AppController =
{
	async getRecentFiles ()
	{
		AppModel.isLoadingFiles = true;

		return axios.get ('/recent').then (response =>
		{
			AppModel.error = '';
			AppModel.files = response.data;
		})
		.catch (error =>
		{
			AppModel.error = error.message;
			AppModel.files = [];
		})
		.finally (() =>
		{
			AppModel.isLoadingFiles = false;
			m.redraw ();
		});
	}
};


export default AppController;
