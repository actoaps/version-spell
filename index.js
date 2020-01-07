const core = require('@actions/core')
const { execSync } = require('child_process')

const theSpell = 'echo `git branch | grep \\* | cut -d \' \' -f2` \\\n' +
	'| sed \'s/master/dev/\' \\\n' +
	'| sed \'s/feature\\///\' \\\n' +
	'| sed \'s/release\\///\' \\\n' +
	'| sed \'s/$/.\'"$(git rev-list --no-merges --count `git branch | grep \\* | cut -d \' \' -f2`).$(git rev-parse --short `git branch | grep \\* | cut -d \' \' -f2`)"\'/\''

try {
	const result = execSync(theSpell)
	core.setOutput('version', result)
} catch (error) {
	core.setFailed(error.message)
}
