const core = require('@actions/core');
const github = require('@actions/github');

/**
 * Provides user-friendly error messages for common error scenarios
 * @param {Error} error - The error object
 * @returns {string} - User-friendly error message
 */
function getUserFriendlyErrorMessage(error) {
  const errorMessage = error.message || '';
  const errorName = error.name || '';
  
  // Input-related errors - check for specific @actions/core error pattern
  if (errorMessage.includes('Input required and not supplied') || errorMessage.includes('who-to-greet')) {
    return `❌ Missing required input: The 'who-to-greet' parameter is required but was not provided. Please specify who you want to greet in your workflow configuration.`;
  }
  
  // GitHub context errors - be more specific
  if (errorMessage.includes('github.context') || 
      (errorMessage.includes('payload') && errorMessage.includes('undefined'))) {
    return `❌ GitHub context error: Unable to access GitHub workflow context or event payload. This might occur if the action is not running in a proper GitHub Actions environment. Error details: ${errorMessage}`;
  }
  
  // Output setting errors - check for core.setOutput errors
  if ((errorMessage.includes('setOutput') && errorMessage.includes('Unable to')) || 
      (errorMessage.includes('output') && errorMessage.includes('write'))) {
    return `❌ Output error: Failed to set the action output. This could be due to permissions or environment issues. Error details: ${errorMessage}`;
  }
  
  // JSON parsing errors
  if (errorName === 'SyntaxError' || errorMessage.includes('JSON.parse') || 
      errorMessage.includes('Unexpected token') || errorMessage.includes('JSON')) {
    return `❌ Data format error: Failed to process GitHub event data. The payload might be malformed. Error details: ${errorMessage}`;
  }
  
  // Generic error with helpful context
  return `❌ Unexpected error occurred: ${errorMessage}\n\nℹ️  Common solutions:\n  - Verify all required inputs are provided\n  - Ensure the action is running in a GitHub Actions environment\n  - Check your workflow YAML configuration\n  - Review the action logs for more details`;
}

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
  
} catch (error) {
  const friendlyMessage = getUserFriendlyErrorMessage(error);
  core.setFailed(friendlyMessage);
}
