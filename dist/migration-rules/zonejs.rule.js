"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkZoneJsMigration = checkZoneJsMigration;
const score_engine_1 = require("../core/score-engine");
function checkZoneJsMigration(sourceFile) {
    const text = sourceFile.getFullText();
    const filePath = sourceFile.getFilePath();
    if (text.includes('zone.js')) {
        (0, score_engine_1.deductPoints)('ZoneJs', filePath, 5, 'zone.js dependency detected', 'Explore zone-less Angular with signals and zoneless change detection');
    }
}
