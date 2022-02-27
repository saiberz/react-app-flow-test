import {message, danger} from "danger"
import { ESLint } from "eslint"

(async function main() {

    const mof = danger.git.modified_files
    // 1. Create an instance.
    const eslint = new ESLint();

    // 2. Lint files.
    const results = await eslint.lintFiles(mof);

    // 3. Format the results.
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    // 4. Output it.
    message(resultText);
})()

