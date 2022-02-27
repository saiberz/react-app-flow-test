const {message, danger} = require('danger')
const { ESLint } = require('eslint');
const github = require('@actions/github')
const core = require('@actions/core')
const {relative} = require('path')

const octokit = github.getOctokit(process.env.GITHUB_TOKEN)
const relativePath = (aPath) => relative(__dirname, aPath)

const lint = async (files) => {
    const eslint = new ESLint()
    const results = await eslint.lintFiles(files)
    const formatter = await eslint.loadFormatter("stylish")
    const resultText = formatter.format(results)
    results.map(({filePath, messages}) =>
        [messages[0]]
        .map(({message, line}) =>
            addCommentToFile(relativePath(filePath), line, message)
        )
    )
    // message(resultText)
    return results
}

const addCommentToFile = async (path, line, body) => {
    const commit_id = danger.git.head
    const {number: pull_number, repo, owner} = danger.github.thisPR
    console.log({
        owner,
        repo,
        pull_number,
        path,
        line: line || 1,
        body,
        commit_id,
    })
    await octokit.rest.pulls.createReviewComment({
        owner,
        repo,
        pull_number,
        path,
        line: line || 1,
        body,
        commit_id,
    })
}


(async function main() {


    const commitId = danger.git.head
    // const mof = danger.git.modified_files
    const mof = ['src/App.js']

    lint(mof)

})()
