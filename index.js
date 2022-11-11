const core = require('@actions/core')
const { execSync } = require('child_process')

const commitCountCommand = 'git rev-list --count HEAD'
const descriptionHashCommand = 'git describe --always'
const branchCommand = 'git rev-parse --abbrev-ref HEAD'

try {
	const commitCount = execSync(commitCountCommand).toString().trim()
	const descriptionHash = execSync(descriptionHashCommand).toString().trim()
	const branch = execSync(branchCommand).toString().trim()

	if (branch == null || branch === '') {
		core.setFailed('Could not extract branch name')
		return
	}

	let version

	const num = branch.replace('release/', '')
		.replace('test/', '')
	if (num === '') {
		version = `${num}.${commitCount}-${descriptionHash}`
	} else {
		const tag = branch
			.replace('master', 'dev')
			.replace(/[/\\?%*:|"<>]/g, '-')
		version = `${tag}.${commitCount}-${descriptionHash}`
	}

	core.info('Version is: ' + version)
	core.setOutput('version', version)
} catch (error) {
	core.setFailed(error.message)
}
