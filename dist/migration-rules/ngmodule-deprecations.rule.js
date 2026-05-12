"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNgModuleDeprecations = checkNgModuleDeprecations;
const score_engine_1 = require("../core/score-engine");
function checkNgModuleDeprecations(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    // Check for forRoot() pattern (can often be simplified)
    if (text.includes('forRoot(')) {
        (0, score_engine_1.deductPoints)('ForRoot', filePath, 3, 'Using forRoot() pattern in NgModule', 'Consider moving to standalone components with provide pattern');
    }
    // Check for entryComponents (deprecated)
    if (text.includes('entryComponents')) {
        (0, score_engine_1.deductPoints)('EntryComponents', filePath, 6, 'Using deprecated entryComponents array', 'Remove entryComponents - no longer needed in Ivy');
    }
}
