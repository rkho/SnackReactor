'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'snackreactor-secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
  GOOGLE_PLACES_API_KEY: 'AIzaSyBqGjNF8aJc2e7M7qhDR7jh3gZnMRwOMno',
  GITHUB_CLIENT_ID: 'e620c603bb0115e2985c',
  GITHUB_CLIENT_SECRET: 'fc1ca04c89f36e7d19eec646361ca4ef236e4111',
  AZURE_TOKEN: 'udsW4tu9pbvJrpry',
  AZURE_LOGIN: 'bportnoy',
  AZURE_REMOTE: 'https://snackreactor.scm.azurewebsites.net/snackreactor.git',
  DB_PASSWORD: 'b2a41fdc',
  DB_USER: 'bc1fe98c77ad56',
  DB_HOST: 'us-cdbr-azure-west-a.cloudapp.net',
  DB_NAME: 'snackreactor',
  DB_PORT: 1433,
  DB_CONNECTION: 'Database=snackreactor;Data Source=us-cdbr-azure-west-a.cloudapp.net;User Id=bc1fe98c77ad56;Password=b2a41fdc'
};
