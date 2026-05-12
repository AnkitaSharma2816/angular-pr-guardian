import chalk from 'chalk';
import { getConfig } from './config';

interface Violation {
  id: string;
  filePath: string;
  points: number;
  message: string;
  suggestion: string;
}

interface ScoreBreakdown {
  ruleName: string;
  deduction: number;
  violations: Violation[];
}

class ScoreEngine {
  private startScore: number = 100; // Default value
  private totalDeductions: number = 0;
  private violations: Map<string, Violation> = new Map();
  private breakdown: Map<string, ScoreBreakdown> = new Map();
  private initialized: boolean = false;

  constructor() {
    // Don't access config here - lazy initialize
  }

  private ensureInitialized() {
    if (!this.initialized) {
      try {
        const config = getConfig();
        this.startScore = config.startScore;
        this.initialized = true;
      } catch (error) {
        // Config not set yet, use defaults
        this.startScore = 100;
        this.initialized = true;
        console.log(chalk.gray('ℹ Using default score (100). Call setConfig() to customize.\n'));
      }
    }
  }

  deductPoints(ruleId: string, filePath: string, points: number, message: string, suggestion: string) {
    this.ensureInitialized();
    
    const violationKey = `${ruleId}:${filePath}`;
    
    // Only deduct once per rule per file
    if (!this.violations.has(violationKey)) {
      const violation: Violation = {
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
      
      const breakdown = this.breakdown.get(ruleId)!;
      breakdown.deduction += points;
      breakdown.violations.push(violation);
      
      // Console output
      console.log(chalk.yellow(`⚠ ${message}`));
      console.log(chalk.gray(`   File: ${filePath}`));
      console.log(chalk.cyan(`   💡 ${suggestion}`));
      console.log(chalk.red(`   ➖ Deducted: ${points} points\n`));
    }
  }

  addPoints(ruleId: string, filePath: string, points: number, message: string) {
    this.ensureInitialized();
    // Optional: implement positive scoring
    console.log(chalk.green(`✅ ${message} (+${points}) - ${filePath}\n`));
  }

  getCurrentScore(): number {
    this.ensureInitialized();
    return Math.max(0, this.startScore - this.totalDeductions);
  }

  getTotalDeductions(): number {
    return this.totalDeductions;
  }

  getViolations(): Violation[] {
    return Array.from(this.violations.values());
  }

  getBreakdown(): Map<string, ScoreBreakdown> {
    return this.breakdown;
  }

  reset() {
    this.totalDeductions = 0;
    this.violations.clear();
    this.breakdown.clear();
    this.initialized = false;
  }
  
  updateStartScore(score: number) {
    this.startScore = score;
  }
}

// Create a single instance
export const scoreEngine = new ScoreEngine();

// Export deductPoints as a function that uses the engine
export function deductPoints(ruleId: string, filePath: string, points: number, message: string, suggestion: string) {
  scoreEngine.deductPoints(ruleId, filePath, points, message, suggestion);
}

export function addPoints(ruleId: string, filePath: string, points: number, message: string) {
  scoreEngine.addPoints(ruleId, filePath, points, message);
}