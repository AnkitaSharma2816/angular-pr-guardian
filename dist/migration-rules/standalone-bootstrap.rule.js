"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStandaloneBootstrapReadiness = checkStandaloneBootstrapReadiness;
const score_engine_1 = require("../core/score-engine");
function checkStandaloneBootstrapReadiness(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    if (text.includes('AppModule')) {
        (0, score_engine_1.deductPoints)('StandaloneBootstrap', filePath, 4, 'AppModule dependency detected', 'Move toward standalone bootstrap with bootstrapApplication()');
    }
}
