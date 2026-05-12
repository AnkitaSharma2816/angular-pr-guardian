"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFormsDeprecations = checkFormsDeprecations;
const score_engine_1 = require("../core/score-engine");
function checkFormsDeprecations(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    // Check for ngModel without name (deprecated)
    if (text.includes('[(ngModel)]') && !text.includes('name=')) {
        (0, score_engine_1.deductPoints)('NgModelName', filePath, 4, 'Using ngModel without name attribute in form', 'Add name attribute to form controls: <input [(ngModel)]="value" name="field">');
    }
    // Check for deprecated form control status methods
    if (text.includes('.pristine') || text.includes('.dirty') ||
        text.includes('.valid') || text.includes('.invalid')) {
        // This is still valid, but suggest using statusChanges observable
        if (text.includes('statusChanges')) {
            // Already using good pattern
        }
        else {
            (0, score_engine_1.deductPoints)('FormStatus', filePath, 2, 'Direct access to form status properties', 'Consider using statusChanges observable for reactive form status handling');
        }
    }
}
