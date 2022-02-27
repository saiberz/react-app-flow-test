const {danger, fail, message, warn} = require('danger');

const modifiedMD = danger.git.modified_files
console.log({modifiedMD})
message("Changed Files in this PR: \n - " + modifiedMD) 
