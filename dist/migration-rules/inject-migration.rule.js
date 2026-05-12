"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInjectMigration = checkInjectMigration;
const score_engine_1 = require("../core/score-engine");
function checkInjectMigration(sourceFile) {
    const classes = sourceFile.getClasses();
    const filePath = sourceFile.getFilePath();
    classes.forEach(classDeclaration => {
        const constructor = classDeclaration.getConstructors()[0];
        if (!constructor)
            return;
        const params = constructor.getParameters();
        if (params.length > 0) {
            (0, score_engine_1.deductPoints)('InjectMigration', filePath, 3, 'Using constructor injection instead of inject() function', 'Replace constructor parameters with `const service = inject(ServiceType)`');
        }
    });
}
