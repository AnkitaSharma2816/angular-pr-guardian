"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSignalInputMigration = checkSignalInputMigration;
const ts_morph_1 = require("ts-morph");
const score_engine_1 = require("../core/score-engine");
function checkSignalInputMigration(sourceFile) {
    const decorators = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.Decorator);
    const filePath = sourceFile.getFilePath();
    decorators.forEach(decorator => {
        if (decorator.getText().includes('@Input')) {
            (0, score_engine_1.deductPoints)('SignalInput', filePath, 4, 'Using @Input decorator instead of signal input', 'Replace @Input() value: Type with input<Type>()');
        }
    });
}
