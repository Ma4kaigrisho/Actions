const core = require('@actions/core');
const exec = require('@actions/exec')
 
async function run() { 
  /*
  1. Parse inputs:
    1.1 base-branch from which to check for updates
    1.2 target-branch to use to create the PR
    1.3 Github token for authentication purposes
    1.4 working direcotry for which to check for dependencies
  2. Execute the npm update command within the working directory
  3. Check whether there are modified package*.json files
  4. If there are modified files:
    4.1 Add and commit files to the target-branch
    4.2 Create a PR to the base-branch using the octokit API
  5. Otherwise, conclude the custom action
  */
  core.info('I am a custom JS action');
  const base_branch = core.getInput('base-branch');
  const target_branch = core.getInput('target-branch');
  const working_directory = core.getInput('working-directory');
  const gh_token = core.getInput('gh-token');
  const debug = core.getBooleanInput('debug');

  core.setSecret(gh_token);

  const base_branch_validation = await validateNames(base_branch)
  const target_branch_validation = await validateNames(target_branch)
  const working_directory_validation = await validateDirs(working_directory)

  core.info(working_directory)
  if(base_branch_validation && target_branch_validation && working_directory_validation){
    core.info("Base branch: " + base_branch)
    core.info("Target branch: " + target_branch)
    core.info("Working direcotry: " + working_directory)
  }

  await exec.exec("npm",["update"],{"cwd": working_directory})

  let status_check_result;
  status_check_result = await exec.getExecOutput("git", ["status", "-s", "package*.json"])

  if (status_check_result.stdout.length > 0) {
    core.info("There are updates available")
  }
  else{
    core.info("No updates at this point")
  }
}

async function validateNames(name) {
  if ( /^[a-zA-Z0-9_\-\.\/]/.test(name)) {
    return true
  }
  core.setFailed("Kotakis your input name does not meet the requirements")
}
async function validateDirs(name) {
  if (/^[A-Za-z0-9-\_\-\/]+$/.test(name)) {
    return true
  }
  core.setFailed("Kotakis your input directory does not meet the requirements")
}
run();