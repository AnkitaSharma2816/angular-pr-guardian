import chalk from 'chalk';
import { scoreEngine } from './score-engine';
import { getConfig } from './config';

export function printFinalReport() {
  const currentScore = scoreEngine.getCurrentScore();
  const totalDeductions = scoreEngine.getTotalDeductions();
  const startScore = getConfig().startScore;
  const breakdown = scoreEngine.getBreakdown();
  const violations = scoreEngine.getViolations();
  
  console.log(chalk.bold('\n📊 ========== ANGULAR PR GUARDIAN REPORT ==========\n'));
  
  // Score Summary
  console.log(chalk.bold('📈 SCORE SUMMARY:'));
  console.log(chalk.white(`   Starting Score: ${startScore}`));
  console.log(chalk.red(`   Total Deductions: -${totalDeductions}`));
  console.log(chalk.bold.green(`   Final Score: ${currentScore}/${startScore}\n`));
  
  // Percentage
  const percentage = (currentScore / startScore) * 100;
  let percentageColor = chalk.red;
  if (percentage >= 80) percentageColor = chalk.green;
  else if (percentage >= 60) percentageColor = chalk.yellow;
  
  console.log(chalk.bold(`   Angular 20 Readiness: ${percentageColor(percentage.toFixed(1))}%)`));
  console.log(chalk.gray(`   Grade: ${getGrade(percentage)}\n`));
  
  // Breakdown by rule
  if (breakdown.size > 0) {
    console.log(chalk.bold('🔍 DETAILED BREAKDOWN:\n'));
    const sortedRules = Array.from(breakdown.entries()).sort((a, b) => b[1].deduction - a[1].deduction);
    
    sortedRules.forEach(([ruleName, data]) => {
      console.log(chalk.yellow(`    ${ruleName}: -${data.deduction} points`));
      data.violations.forEach(v => {
        console.log(chalk.gray(`      • ${v.filePath.split('/').pop()}`));
      });
      console.log('');
    });
  }
  
  // Top Priority Fixes
  if (violations.length > 0) {
    console.log(chalk.bold(' TOP PRIORITY FIXES (fix these first):\n'));
    const topViolations = violations
      .sort((a, b) => b.points - a.points)
      .slice(0, 5);
    
    topViolations.forEach((v, index) => {
      console.log(chalk.white(`${index + 1}. ${v.message}`));
      console.log(chalk.cyan(`   💡 Fix: ${v.suggestion}`));
      console.log(chalk.gray(`   📁 ${v.filePath}\n`));
    });
  }
  
  // Recommendations based on score
  console.log(chalk.bold('💡 RECOMMENDATIONS:\n'));
  if (percentage >= 90) {
    console.log(chalk.green('   Excellent! Your code is ready for Angular 20.'));
    console.log(chalk.green('   Minor improvements only needed.'));
  } else if (percentage >= 70) {
    console.log(chalk.yellow('   Good progress! Focus on high-impact fixes above.'));
    console.log(chalk.yellow('   Consider running ng update after fixes.'));
  } else if (percentage >= 50) {
    console.log(chalk.yellow('   Significant migration needed. Start with top priorities.'));
    console.log(chalk.yellow('   Plan for 2-3 sprints of migration work.'));
  } else {
    console.log(chalk.red('   Major refactoring required.'));
    console.log(chalk.red('   Consider incremental migration starting with standalone components.'));
  }
  
  console.log(chalk.bold('\n=================================================\n'));
}

function getGrade(percentage: number): string {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
}