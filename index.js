const core = require('@actions/core')
const {execSync} = require('child_process')

const commitCountCommand = 'git rev-list --count HEAD'
const descriptionHashCommand = 'git describe --always'
const branchCommand = 'git rev-parse --abbrev-ref HEAD'

try {
    const commitCount = execSync(commitCountCommand).toString().trim()
    const descriptionHash = execSync(descriptionHashCommand).toString().trim()
    let branch = execSync(branchCommand).toString().trim()

    if (branch == null || branch === '') {
        core.setFailed('Could not extract branch name')
        return
    }

    if (branch === 'master' || branch === 'main') {
        branch = 'dev'
    }

    const num = branch.replace('release/', '')
        .replace('test/', '')
        .replace(/[/\\?%*:|"<>]/g, '-')

    const version = `${num}.${commitCount}-${descriptionHash}`

    core.info('Version is: ' + version)
    core.setOutput('version', version)
} catch (error) {
    core.setFailed(error.message)
}
