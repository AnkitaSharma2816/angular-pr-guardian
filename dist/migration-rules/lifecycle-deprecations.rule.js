"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLifecycleDeprecations = checkLifecycleDeprecations;
const score_engine_1 = require("../core/score-engine");
function checkLifecycleDeprecations(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    // Check for ngDoCheck (often indicates performance issues)
    if (text.includes('ngDoCheck')) {
        (0, score_engine_1.deductPoints)('NgDoCheck', filePath, 5, 'Using ngDoCheck lifecycle hook', 'Use OnPush change detection with signals instead of ngDoCheck');
    }
    // Check for ngOnChanges without proper typing
    if (text.includes('SimpleChanges') && !text.includes('SimpleChanges')) {
        (0, score_engine_1.deductPoints)('SimpleChanges', filePath, 2, 'ngOnChanges without proper typing', 'Type SimpleChanges correctly: ngOnChanges(changes: SimpleChanges)');
    }
}
