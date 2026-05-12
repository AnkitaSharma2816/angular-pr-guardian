"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOutputMigration = checkOutputMigration;
const ts_morph_1 = require("ts-morph");
const score_engine_1 = require("../core/score-engine");
function checkOutputMigration(sourceFile) {
    const decorators = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.Decorator);
    const filePath = sourceFile.getFilePath();
    decorators.forEach(decorator => {
        if (decorator.getText().includes('@Output')) {
            (0, score_engine_1.deductPoints)('OutputMigration', filePath, 4, 'Using @Output decorator instead of output() function', 'Replace @Output() event = new EventEmitter() with event = output()');
        }
    });
}
