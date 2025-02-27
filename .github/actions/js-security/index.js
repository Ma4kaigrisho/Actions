const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
    try{const pr_title = core.getInput("pr-title");
    if(pr_title.startsWith('feat')){
        core.info("PR is a feature")
    }
    else{
        core.setFailed("PR is not a feature")
    }}
    catch(e){
        core.setFailed(e.message)
    }
}
run()