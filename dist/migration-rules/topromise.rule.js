"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToPromiseMigration = checkToPromiseMigration;
const ts_morph_1 = require("ts-morph");
const score_engine_1 = require("../core/score-engine");
function checkToPromiseMigration(sourceFile) {
    const calls = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.CallExpression);
    const filePath = sourceFile.getFilePath();
    calls.forEach(call => {
        const expression = call.getExpression().getText();
        if (expression.includes('toPromise')) {
            (0, score_engine_1.deductPoints)('ToPromiseMigration', filePath, 10, 'Deprecated toPromise() method detected', 'Replace toPromise() with firstValueFrom() or lastValueFrom() from rxjs');
        }
    });
}
