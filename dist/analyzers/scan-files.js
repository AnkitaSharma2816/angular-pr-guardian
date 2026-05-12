"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanFiles = scanFiles;
const glob_1 = require("glob");
const file_name_rule_1 = require("../rules/file-name.rule");
function scanFiles() {
    const files = (0, glob_1.globSync)('D:/country-viewer/src/**/*.{ts,html}');
    console.log(files);
    for (const file of files) {
        (0, file_name_rule_1.checkFileNameRule)(file);
        // checkComponentSizeRule(file);
    }
}
