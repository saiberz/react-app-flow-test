import {message, danger} from "danger"
const { ESLint } = require("eslint");


const lint = async (files) => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(files);
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);
    message(resultText);
    return results;
}


(async function main() {

    const mof = danger.git.modified_files

    lint(mof)

})()
