const {message, danger} = require("danger")
const { ESLint } = require("eslint");
const github = require('@actions/github');
const core = require('@actions/core');


const lint = async (files) => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(files);
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);
    message(resultText);
    return results;
}


(async function main() {

    const token = core.getInput('GITHUB_TOKEN');
    const octokit = github.getOctokit(token)

    console.log({git: danger.git})
    console.log({github: danger.github})

    const mof = danger.git.modified_files

    console.log({mof})

    lint(mof)

})()
