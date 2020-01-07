const core = require('@actions/core')
const { execSync } = require('child_process')

const theSpell = 'echo `git rev-parse --abbrev-ref HEAD` \\\n' +
	'| sed \'s/master/dev/\' \\\n' +
	'| sed \'s/feature\\///\' \\\n' +
	'| sed \'s/release\\///\' \\\n' +
	'| sed \'s/$/.\'"$(git rev-list --no-merges --count `git rev-parse --abbrev-ref HEAD`).$(git describe --always)"\'/\''

try {
	const result = execSync(theSpell)
	core.info(result)
	core.setOutput('version', result)
} catch (error) {
	core.setFailed(error.message)
}
