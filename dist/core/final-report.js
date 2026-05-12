"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printFinalReport = printFinalReport;
const chalk_1 = __importDefault(require("chalk"));
const score_engine_1 = require("./score-engine");
const config_1 = require("./config");
function printFinalReport() {
    const currentScore = score_engine_1.scoreEngine.getCurrentScore();
    const totalDeductions = score_engine_1.scoreEngine.getTotalDeductions();
    const startScore = (0, config_1.getConfig)().startScore;
    const breakdown = score_engine_1.scoreEngine.getBreakdown();
    const violations = score_engine_1.scoreEngine.getViolations();
    console.log(chalk_1.default.bold('\n📊 ========== ANGULAR PR GUARDIAN REPORT ==========\n'));
    // Score Summary
    console.log(chalk_1.default.bold('📈 SCORE SUMMARY:'));
    console.log(chalk_1.default.white(`   Starting Score: ${startScore}`));
    console.log(chalk_1.default.red(`   Total Deductions: -${totalDeductions}`));
    console.log(chalk_1.default.bold.green(`   Final Score: ${currentScore}/${startScore}\n`));
    // Percentage
    const percentage = (currentScore / startScore) * 100;
    let percentageColor = chalk_1.default.red;
    if (percentage >= 80)
        percentageColor = chalk_1.default.green;
    else if (percentage >= 60)
        percentageColor = chalk_1.default.yellow;
    console.log(chalk_1.default.bold(`   Angular 20 Readiness: ${percentageColor(percentage.toFixed(1))}%)`));
    console.log(chalk_1.default.gray(`   Grade: ${getGrade(percentage)}\n`));
    // Breakdown by rule
    if (breakdown.size > 0) {
        console.log(chalk_1.default.bold('🔍 DETAILED BREAKDOWN:\n'));
        const sortedRules = Array.from(breakdown.entries()).sort((a, b) => b[1].deduction - a[1].deduction);
        sortedRules.forEach(([ruleName, data]) => {
            console.log(chalk_1.default.yellow(`    ${ruleName}: -${data.deduction} points`));
            data.violations.forEach(v => {
                console.log(chalk_1.default.gray(`      • ${v.filePath.split('/').pop()}`));
            });
            console.log('');
        });
    }
    // Top Priority Fixes
    if (violations.length > 0) {
        console.log(chalk_1.default.bold(' TOP PRIORITY FIXES (fix these first):\n'));
        const topViolations = violations
            .sort((a, b) => b.points - a.points)
            .slice(0, 5);
        topViolations.forEach((v, index) => {
            console.log(chalk_1.default.white(`${index + 1}. ${v.message}`));
            console.log(chalk_1.default.cyan(`   💡 Fix: ${v.suggestion}`));
            console.log(chalk_1.default.gray(`   📁 ${v.filePath}\n`));
        });
    }
    // Recommendations based on score
    console.log(chalk_1.default.bold('💡 RECOMMENDATIONS:\n'));
    if (percentage >= 90) {
        console.log(chalk_1.default.green('   Excellent! Your code is ready for Angular 20.'));
        console.log(chalk_1.default.green('   Minor improvements only needed.'));
    }
    else if (percentage >= 70) {
        console.log(chalk_1.default.yellow('   Good progress! Focus on high-impact fixes above.'));
        console.log(chalk_1.default.yellow('   Consider running ng update after fixes.'));
    }
    else if (percentage >= 50) {
        console.log(chalk_1.default.yellow('   Significant migration needed. Start with top priorities.'));
        console.log(chalk_1.default.yellow('   Plan for 2-3 sprints of migration work.'));
    }
    else {
        console.log(chalk_1.default.red('   Major refactoring required.'));
        console.log(chalk_1.default.red('   Consider incremental migration starting with standalone components.'));
    }
    console.log(chalk_1.default.bold('\n=================================================\n'));
}
function getGrade(percentage) {
    if (percentage >= 90)
        return 'A+';
    if (percentage >= 80)
        return 'A';
    if (percentage >= 70)
        return 'B';
    if (percentage >= 60)
        return 'C';
    if (percentage >= 50)
        return 'D';
    return 'F';
}
