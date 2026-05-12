"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOnPushMigration = checkOnPushMigration;
const score_engine_1 = require("../core/score-engine");
function checkOnPushMigration(sourceFile) {
    const classes = sourceFile.getClasses();
    classes.forEach(classDeclaration => {
        const decorators = classDeclaration.getDecorators();
        const componentDecorator = decorators.find(d => d.getName() === 'Component');
        if (componentDecorator) {
            const text = componentDecorator.getText();
            if (!text.includes('ChangeDetectionStrategy.OnPush')) {
                (0, score_engine_1.deductPoints)('OnPushStrategy', sourceFile.getFilePath(), 5, 'Missing OnPush change detection strategy', 'Add `changeDetection: ChangeDetectionStrategy.OnPush` to your component decorator for better performance');
            }
        }
    });
}
