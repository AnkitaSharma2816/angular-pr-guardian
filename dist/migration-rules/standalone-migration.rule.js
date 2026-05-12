"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStandaloneMigration = checkStandaloneMigration;
const score_engine_1 = require("../core/score-engine");
function checkStandaloneMigration(sourceFile) {
    const classes = sourceFile.getClasses();
    const filePath = sourceFile.getFilePath();
    classes.forEach(classDeclaration => {
        const decorators = classDeclaration.getDecorators();
        const componentDecorator = decorators.find(d => d.getName() === 'Component');
        if (!componentDecorator)
            return;
        const text = componentDecorator.getText();
        if (!text.includes('standalone')) {
            (0, score_engine_1.deductPoints)('StandaloneComponents', filePath, 5, 'Component is not standalone', 'Add `standalone: true` to component decorator and import dependencies directly');
        }
    });
}
