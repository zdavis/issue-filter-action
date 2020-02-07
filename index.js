const core = require('@actions/core');
const github = require('@actions/github');

try {
  const requiredLabels = core.getInput("labels").split(",");
  const type = core.getInput("type");
  const issue = github.context.payload.issue;
  const action = github.context.payload.acction;

  function finish(match) {
    const msg = match ? "Issue matches" : "Issue does not match";

    console.log(msg);
    core.setOutput("match", match);
  }

  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

  if (!issue) return finish(false);
  if (!Array.isArray(issue.labels)) return finish(false);

  const issueLabels = issue.labels.map((label) => label.name);

  let result = false;
  if (type === "any") {
    result = issueLabels.some((label) => requiredLabels.includes(label));
  } else {
    result = requiredLabels.every((label) => issueLabels.includes(label));
  }
  return finish(result);

} catch (error) {
  core.setFailed(error.message);
}
