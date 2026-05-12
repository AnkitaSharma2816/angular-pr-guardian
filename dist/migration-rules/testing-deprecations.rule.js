"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTestingDeprecations = checkTestingDeprecations;
const score_engine_1 = require("../core/score-engine");
function checkTestingDeprecations(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    if (!filePath.includes('.spec.ts'))
        return;
    // Check for TestBed.inject vs TestBed.get
    if (text.includes('TestBed.get(')) {
        (0, score_engine_1.deductPoints)('TestBedGet', filePath, 4, 'Using deprecated TestBed.get()', 'Replace TestBed.get(Service) with TestBed.inject(Service)');
    }
    // Check for async() vs waitForAsync()
    if (text.includes('async(') && !text.includes('waitForAsync')) {
        (0, score_engine_1.deductPoints)('AsyncTest', filePath, 4, 'Using deprecated async() test helper', 'Replace async() with waitForAsync()');
    }
}
