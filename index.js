const core = require('@actions/core')
const { execSync } = require('child_process')

const theSpell = 'echo $GITHUB_REF \\\n' +
	'| sed \'s/refs\\/heads\\///\' \\\n' +
	'| sed \'s/master/dev/\' \\\n' +
	'| sed \'s/feature\\///\' \\\n' +
	'| sed \'s/release\\///\' \\\n' +
	'| sed \'s/$/.\'"$(git rev-list --no-merges --count $GITHUB_REF).$(git rev-parse --short $GITHUB_REF)"\'/\''

try {
	const result = execSync(theSpell)
	core.setOutput('version', result)
} catch (error) {
	core.setFailed(error.message)
}
