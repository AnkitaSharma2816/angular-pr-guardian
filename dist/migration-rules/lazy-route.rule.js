"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLazyRouteMigration = checkLazyRouteMigration;
const score_engine_1 = require("../core/score-engine");
function checkLazyRouteMigration(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    if (!filePath.includes('routes') && !filePath.includes('app-routing'))
        return;
    const componentPattern = /component:\s*(\w+)/g;
    const loadComponentPattern = /loadComponent/g;
    const hasDirectComponents = componentPattern.test(text);
    const hasLazyComponents = loadComponentPattern.test(text);
    if (hasDirectComponents && !hasLazyComponents) {
        (0, score_engine_1.deductPoints)('LazyLoading', filePath, 3, 'Components loaded eagerly instead of lazy loading', 'Use loadComponent: () => import("./component") instead of component: ComponentClass');
    }
}
