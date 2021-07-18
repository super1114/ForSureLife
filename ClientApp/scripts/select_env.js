/* eslint-disable no-console */
var env = process.argv[2];
var ncp = require('ncp').ncp;
ncp(`.env.fsl.${env}`, '.env', function (err) {
  if (err) {
    return console.error(err);
  }
  console.log(`Selected environment variables for ${env}`);
});
