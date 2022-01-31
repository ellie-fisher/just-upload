import m from 'mithril';

import Navbar from '~/misc/Navbar.jsx';
import RecentFilesView from '~/misc/RecentFilesView.jsx';


const AppView =
{
	view ({ attrs, children })
	{
		const { showRecentFiles } = attrs;

		return (
			<div>
				<Navbar />

				<section class='section'>
					<div class='columns is-centered is-vcentered'>
						<div class='column has-text-centered'>
							<a onclick={() => m.route.set ('/')}>
								<img src='./img/logo.png' style={{ height: '8rem' }}>
									<h1 class='title is-1'>Just Upload</h1>
								</img>
							</a>
							<h4 class='subtitle'>
								No ads, no sign-ups, no data collection
							</h4>
						</div>
					</div>

					<div class='columns is-centered is-vcentered'>
						<div class='column is-two-fifths'>
							<div class='box box-primary'>
								{children}
							</div>
						</div>
					</div>

					{
						!showRecentFiles
							? ''
							: <div class='columns is-centered'>
								<div class='column is-one-third'>
									<div class='box'>
										<RecentFilesView />
									</div>
								</div>
							</div>
					}
				</section>
			</div>
		);
	},
};


export default AppView;
