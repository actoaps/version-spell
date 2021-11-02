const core = require('@actions/core')
const { execSync } = require('child_process')

const lsRemoteOriginCommand = 'git ls-remote --heads origin'
const headCommitCommand = 'git rev-parse HEAD'
const commitCountCommand = 'git rev-list --no-merges --count master'
const descriptionHashCommand = 'git describe --always master'

try {
	const lsRemoteOrigin = execSync(lsRemoteOriginCommand).toString().trim().split('\n')
	const headCommit = execSync(headCommitCommand).toString().trim()
	const commitCount = execSync(commitCountCommand).toString().trim()
	const descriptionHash = execSync(descriptionHashCommand).toString().trim()

	let branch = lsRemoteOrigin.filter(x => x.startsWith(headCommit))[0]
	if (branch) branch = branch.match(/(?<=refs\/heads\/).+/)[0]

	if (branch == null || branch === '') core.setFailed('Could not extract branch name')

	const tag = branch
		.replace('master', 'dev')
		.replace('feature/', '')
		.replace('release/', '')
		.replace('test/', '')

	const version = `${tag}.${commitCount}.${descriptionHash}`

	core.info('Version is: ' + version)
	core.setOutput('version', version)
} catch (error) {
	core.setFailed(error.message)
}
