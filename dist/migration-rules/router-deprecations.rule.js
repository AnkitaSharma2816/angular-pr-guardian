"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRouterDeprecations = checkRouterDeprecations;
const score_engine_1 = require("../core/score-engine");
function checkRouterDeprecations(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    // Check for deprecated CanActivate guards
    if (text.includes('CanActivate') && !text.includes('CanActivateFn')) {
        (0, score_engine_1.deductPoints)('CanActivate', filePath, 5, 'Using deprecated CanActivate class guard', 'Replace CanActivate with functional guard: CanActivateFn');
    }
    // Check for queryParams vs queryParamMap
    if (text.includes('queryParams') && !text.includes('queryParamMap')) {
        (0, score_engine_1.deductPoints)('QueryParams', filePath, 3, 'Using queryParams instead of queryParamMap', 'Use queryParamMap for better type safety and performance');
    }
    // Check for params vs paramMap
    if (text.includes('.params') && text.includes('subscribe')) {
        (0, score_engine_1.deductPoints)('RouteParams', filePath, 3, 'Using params observable instead of paramMap', 'Use paramMap instead of params for better performance');
    }
}
