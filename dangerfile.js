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

    const octokit = github.getOctokit(process.env.GITHUB_TOKEN)

    console.log({git: danger.git})
    console.log({github: danger.github})

    const mof = danger.git.modified_files

    console.log({mof})

    lint(mof)

})()
