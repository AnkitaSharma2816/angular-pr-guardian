"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAsyncPipeMigration = checkAsyncPipeMigration;
const score_engine_1 = require("../core/score-engine");
function checkAsyncPipeMigration(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    // Check for manual subscriptions without AsyncPipe
    const subscribeMatches = text.match(/\.subscribe\(/g);
    const asyncPipeMatches = text.match(/\|\s*async/g);
    if (subscribeMatches && subscribeMatches.length > 0) {
        const manualSubscriptions = subscribeMatches.length;
        const asyncUsage = asyncPipeMatches?.length || 0;
        if (manualSubscriptions > asyncUsage) {
            (0, score_engine_1.deductPoints)('AsyncPipe', filePath, 4, `Found ${manualSubscriptions} manual subscription(s) without AsyncPipe`, 'Use AsyncPipe in templates and let Angular handle subscriptions automatically');
        }
    }
}
