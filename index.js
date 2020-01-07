const core = require('@actions/core')
const { execSync } = require('child_process')

const theSpell = 'echo $GITHUB_REF \\\n' +
	'| sed \'s/master/dev/\' \\\n' +
	'| sed \'s/feature\\///\' \\\n' +
	'| sed \'s/release\\///\' \\\n' +
	'| sed \'s/$/.\'"$(git rev-list --no-merges --count $GITHUB_REF).$(git describe --always $GITHUB_REF)"\'/\''

try {
	const result = execSync(theSpell)
	core.info(result)
	core.setOutput('version', result)
} catch (error) {
	core.setFailed(error.message)
}
