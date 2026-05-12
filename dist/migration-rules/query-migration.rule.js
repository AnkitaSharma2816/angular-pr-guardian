"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQueryMigration = checkQueryMigration;
const ts_morph_1 = require("ts-morph");
const score_engine_1 = require("../core/score-engine");
function checkQueryMigration(sourceFile) {
    const decorators = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.Decorator);
    const filePath = sourceFile.getFilePath();
    decorators.forEach(decorator => {
        const text = decorator.getText();
        if (text.includes('@ViewChild') || text.includes('@ContentChild')) {
            (0, score_engine_1.deductPoints)('QueryMigration', filePath, 3, 'Using legacy query decorator (@ViewChild/@ContentChild)', 'Replace with signal queries: viewChild() or contentChild()');
        }
    });
}
