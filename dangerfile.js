import {message, danger} from "danger"

const modifiedMD = danger.git.modified_files.join("- ")
message("Changes in this PR: \n - " + modifiedMD) 
