"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreEngine = void 0;
exports.deductPoints = deductPoints;
exports.addPoints = addPoints;
const chalk_1 = __importDefault(require("chalk"));
const config_1 = require("./config");
class ScoreEngine {
    constructor() {
        this.startScore = 100; // Default value
        this.totalDeductions = 0;
        this.violations = new Map();
        this.breakdown = new Map();
        this.initialized = false;
        // Don't access config here - lazy initialize
    }
    ensureInitialized() {
        if (!this.initialized) {
            try {
                const config = (0, config_1.getConfig)();
                this.startScore = config.startScore;
                this.initialized = true;
            }
            catch (error) {
                // Config not set yet, use defaults
                this.startScore = 100;
                this.initialized = true;
                console.log(chalk_1.default.gray('ℹ Using default score (100). Call setConfig() to customize.\n'));
            }
        }
    }
    deductPoints(ruleId, filePath, points, message, suggestion) {
        this.ensureInitialized();
        const violationKey = `${ruleId}:${filePath}`;
        // Only deduct once per rule per file
        if (!this.violations.has(violationKey)) {
            const violation = {
                id: ruleId,
                filePath,
                points,
                message,
                suggestion
            };
            this.violations.set(violationKey, violation);
            this.totalDeductions += points;
            // Track breakdown
            if (!this.breakdown.has(ruleId)) {
                this.breakdown.set(ruleId, {
                    ruleName: ruleId,
                    deduction: 0,
                    violations: []
                });
            }
            const breakdown = this.breakdown.get(ruleId);
            breakdown.deduction += points;
            breakdown.violations.push(violation);
            // Console output
            console.log(chalk_1.default.yellow(`⚠ ${message}`));
            console.log(chalk_1.default.gray(`   File: ${filePath}`));
            console.log(chalk_1.default.cyan(`   💡 ${suggestion}`));
            console.log(chalk_1.default.red(`   ➖ Deducted: ${points} points\n`));
        }
    }
    addPoints(ruleId, filePath, points, message) {
        this.ensureInitialized();
        // Optional: implement positive scoring
        console.log(chalk_1.default.green(`✅ ${message} (+${points}) - ${filePath}\n`));
    }
    getCurrentScore() {
        this.ensureInitialized();
        return Math.max(0, this.startScore - this.totalDeductions);
    }
    getTotalDeductions() {
        return this.totalDeductions;
    }
    getViolations() {
        return Array.from(this.violations.values());
    }
    getBreakdown() {
        return this.breakdown;
    }
    reset() {
        this.totalDeductions = 0;
        this.violations.clear();
        this.breakdown.clear();
        this.initialized = false;
    }
    updateStartScore(score) {
        this.startScore = score;
    }
}
// Create a single instance
exports.scoreEngine = new ScoreEngine();
// Export deductPoints as a function that uses the engine
function deductPoints(ruleId, filePath, points, message, suggestion) {
    exports.scoreEngine.deductPoints(ruleId, filePath, points, message, suggestion);
}
function addPoints(ruleId, filePath, points, message) {
    exports.scoreEngine.addPoints(ruleId, filePath, points, message);
}
