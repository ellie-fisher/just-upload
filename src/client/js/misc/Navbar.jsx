import m from 'mithril';


const Navbar =
{
	clickUpload ()
	{
		m.route.set ('/');
	},

	clickRules ()
	{
		m.route.set ('/rules')
	},

	view ()
	{
		return (
			<nav class='navbar is-fixed-top'>
				<div class='navbar-brand'>
					<a class='navbar-item' onclick={this.clickUpload}>
						<img src='./img/logo.png' />
					</a>
				</div>

				<div class='navbar-menu'>
					<div class='navbar-start'>
						<a class='navbar-item' onclick={this.clickUpload}>
							Upload
						</a>

						<a class='navbar-item' onclick={this.clickRules}>
							Rules
						</a>
					</div>
				</div>
			</nav>
		);
	},
};


export default Navbar;
