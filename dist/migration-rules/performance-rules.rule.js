"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPerformanceRules = checkPerformanceRules;
const score_engine_1 = require("../core/score-engine");
function checkPerformanceRules(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    // Check for missing trackBy in ngFor
    if (text.includes('*ngFor') && !text.includes('trackBy')) {
        (0, score_engine_1.deductPoints)('MissingTrackBy', filePath, 3, '*ngFor without trackBy', 'Add trackBy function to improve performance: *ngFor="let item of items; trackBy: trackById"');
    }
    // Check for function calls in templates
    const templatePattern = /{{[^}]*\([^)]*\)[^}]*}}/g;
    if (templatePattern.test(text)) {
        (0, score_engine_1.deductPoints)('FunctionInTemplate', filePath, 4, 'Function call in template binding', 'Move function logic to component property or pipe for better performance');
    }
}
