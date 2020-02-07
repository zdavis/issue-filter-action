const core = require('@actions/core');
const github = require('@actions/github');

try {
  const labels = core.getInput("labels");
  const debug = core.getInput("debug");
  const issue = github.context.payload.issue;
  const action = github.context.payload.acction;

  function finish(match) {
    const msg = match ? "Issue matches" : "Issue does not match";
    console.log(msg);
    core.setOutput("match", match);
  }

  if (debug) {
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  }

  if (!issue) return finish(false);
  if (!Array.isArray(issue.labels)) return finish(false);
  return finish(issues.labels.some((label) => labels.includes(label.name)));
  
} catch (error) {
  core.setFailed(error.message);
}
