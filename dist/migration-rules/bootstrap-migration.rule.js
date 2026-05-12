"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBootstrapMigration = checkBootstrapMigration;
const score_engine_1 = require("../core/score-engine");
function checkBootstrapMigration(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    if (text.includes('bootstrapModule')) {
        (0, score_engine_1.deductPoints)('BootstrapMigration', filePath, 8, 'Using deprecated bootstrapModule() instead of bootstrapApplication()', 'Replace NgModule bootstrap with standalone bootstrap using bootstrapApplication()');
    }
}
