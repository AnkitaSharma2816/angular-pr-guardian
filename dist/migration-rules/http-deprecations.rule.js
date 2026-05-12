"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHttpDeprecations = checkHttpDeprecations;
const score_engine_1 = require("../core/score-engine");
function checkHttpDeprecations(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    // Check for HttpClient without proper cleanup
    if (text.includes('.subscribe(') &&
        (text.includes('HttpClient') || text.includes('http.'))) {
        const subscribePattern = /\.subscribe\([^;]+\)/g;
        const matches = text.match(subscribePattern);
        if (matches && matches.length > 0) {
            // Check if there's any cleanup (takeUntil, AsyncPipe, etc.)
            const hasCleanup = text.includes('takeUntil') ||
                text.includes('AsyncPipe') ||
                text.includes('firstValueFrom');
            if (!hasCleanup) {
                (0, score_engine_1.deductPoints)('HttpCleanup', filePath, 6, 'HTTP subscriptions without proper cleanup detected', 'Use AsyncPipe in templates or add takeUntil/unsubscribe in ngOnDestroy');
            }
        }
    }
    // Check for deprecated .finally() on Http requests
    if (text.includes('.finally(') && text.includes('Http')) {
        (0, score_engine_1.deductPoints)('HttpFinally', filePath, 3, 'Using deprecated .finally() on HTTP requests', 'Use finalize() operator from RxJS instead');
    }
}
