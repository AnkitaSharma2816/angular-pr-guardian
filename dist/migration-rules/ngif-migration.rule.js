"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNgIfMigration = checkNgIfMigration;
const fs_1 = __importDefault(require("fs"));
const score_engine_1 = require("../core/score-engine");
function checkNgIfMigration(filePath) {
    if (!filePath.endsWith('.html'))
        return;
    const content = fs_1.default.readFileSync(filePath, 'utf-8');
    if (content.includes('*ngIf')) {
        (0, score_engine_1.deductPoints)('NgIfMigration', filePath, 2, 'Using legacy *ngIf directive', 'Replace *ngIf with modern @if syntax: @if (condition) { }');
    }
}
