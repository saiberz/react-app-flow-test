const {danger, markdown} = require('danger')

const { ESLint } = require('eslint');
const {relative} = require('path')


const relativePath = (aPath) => relative(__dirname, aPath)
const toLink = ({ owner, repo, branch }) => ({ filePath, line }) => `https://github.com/${owner}/${repo}/blob/${branch}/${filePath}#L${line}`
const statusToMessage = (status) => {
    switch (status) {
    case 1: return '*⚠️ Warning*'
    case 2: return '*❗Error*'
    }
}


const lint = async (files) => {
    const eslint = new ESLint()
    const results = await eslint.lintFiles(files)
    createReport(results)
}


const createReport = (results) => {
    const {owner, head: branch, repo} = danger.github.thisPR;
    const toGHLink = toLink({ owner, repo, branch })

    if (results.length < 1) return;
    let report =
        `
| File | Status | Message |
| --- | --- | --- |`;

    results.forEach(({ filePath: aPath, messages }) => {
        const filePath = relativePath(aPath)
        messages.map(({ message, severity, line }) => report = `${report}
| [${filePath}:${line}](${toGHLink({ filePath, line })}) | ${statusToMessage(severity)} | ${message} |`)
    })

    console.log(report);

}


(async function main() {


    const mof = danger.git.modified_files
    markdown("something", "src/App.js", 4)

    lint(mof)

})()
