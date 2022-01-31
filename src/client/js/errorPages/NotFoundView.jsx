import m from 'mithril';


const NotFoundView =
{
	view ()
	{
		return (
			<div class='p-1 pb-2 has-text-centered'>
				<h4 class='title is-4'>Page Not Found</h4>

				<div class='columns is-centered'>
					The page you requested has been moved or does not exist.
				</div>
			</div>
		);
	},
};


export default NotFoundView;
