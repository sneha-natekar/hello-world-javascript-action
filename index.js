const core = require('@actions/core');
const github = require('@actions/github');

// Internationalization translations
const translations = {
  en: { hello: 'Hello' },
  fr: { hello: 'Bonjour' },
  es: { hello: 'Hola' }
};

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  const language = core.getInput('language') || 'en';
  
  // Get greeting based on language, default to English if language not found
  const greeting = (translations[language] || translations.en).hello;
  
  console.log(`${greeting} ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
