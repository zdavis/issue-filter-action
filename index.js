const core = require('@actions/core');
const github = require('@actions/github');

try {
  const labels = core.getInput("labels");
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  // console.log(payload, 'payload');
  const match = true;
  //
  // const match = payload.issue.labels
  //
  core.setOutput("match", match);
  console.log(match, "Match");
} catch (error) {
  core.setFailed(error.message);
}
