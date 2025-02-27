const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
    const pr_title = core.getInput("pr-title");
    if(/^feat/.test(pr_title)){
        core.info("PR is a feature")
    }
    else{
        core.info("PR is not a feature")
    }
}
run()