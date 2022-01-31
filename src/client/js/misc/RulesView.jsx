import m from 'mithril';

import config from '~/cfg/client.config.js';


const RulesView =
{
	view ()
	{
		const { rules } = config;
		const { length } = rules;

		const ruleComponents = [];

		for ( let i = 0; i < length; i++ )
		{
			ruleComponents.push (<li><strong>{`${i + 1}.`}</strong> {rules[i]}</li>);
		}

		return (
			<div class='p-1 pb-2'>
				<h4 class='title is-4 has-text-centered'>Rules</h4>

				<div class='columns is-centered'>
					<div class='p-2'>
						<ol class='rules-list'>
							{ruleComponents}
						</ol>
					</div>
				</div>
			</div>
		);
	},
};


export default RulesView;
