"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSignalMigration = checkSignalMigration;
const ts_morph_1 = require("ts-morph");
const score_engine_1 = require("../core/score-engine");
function checkSignalMigration(sourceFile) {
    const identifiers = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.Identifier);
    const filePath = sourceFile.getFilePath();
    identifiers.forEach(identifier => {
        if (identifier.getText() === 'BehaviorSubject') {
            (0, score_engine_1.deductPoints)('SignalMigration', filePath, 6, 'Using BehaviorSubject instead of Angular Signals', 'Replace BehaviorSubject with signal() for reactive state management');
        }
    });
}
