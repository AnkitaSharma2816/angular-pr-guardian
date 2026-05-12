#!/usr/bin/env node

import { Command } from 'commander';
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';

// Import after chalk is defined
import { setConfig, getConfig } from './core/config';
import { scanFiles } from './analyzers/scan-files';
import { printFinalReport } from './core/final-report';
import { resetProject } from './analyzers/ts-project';

const program = new Command();

program
  .name('angular-pr-guardian')
  .description('Angular PR Review Assistant - Modern Angular migration tool')
  .version('2.0.0');

program
  .command('scan')
  .description('Scan Angular project for code quality issues')
  .option('-p, --path <path>', 'Path to Angular project', process.cwd())
  .action((options) => {
    const projectPath = path.resolve(options.path);
    if (!fs.existsSync(projectPath)) {
      console.error(`❌ Project path not found: ${projectPath}`);
      process.exit(1);
    }
    
    setConfig(projectPath);
    console.log(`🔍 Scanning project: ${projectPath}`);
    scanFiles();
  });

program
  .command('migration')
  .description('Check Angular 20 migration readiness')
  .option('-p, --path <path>', 'Path to Angular project', process.cwd())
  .option('-s, --start-score <number>', 'Starting score (default: 100)', '100')
  .option('--strict', 'Enable strict mode (default: true)', true)
  .action(async (options) => {
    const projectPath = path.resolve(options.path);
    const startScore = parseInt(options.startScore);
    
    // Validate project path
    if (!fs.existsSync(projectPath)) {
      console.error(`❌ Project path not found: ${projectPath}`);
      process.exit(1);
    }
    
    const tsConfigPath = path.join(projectPath, 'tsconfig.json');
    if (!fs.existsSync(tsConfigPath)) {
      console.error(`❌ tsconfig.json not found in ${projectPath}`);
      console.error('   Make sure you are pointing to a valid Angular project root');
      process.exit(1);
    }
    
    // IMPORTANT: Set config FIRST before importing modules that need it
    setConfig(projectPath, startScore, options.strict);
    
    console.log(chalk.bold(`\n Angular PR Guardian - Migration Readiness Check\n`));
    console.log(chalk.white(`   Project: ${projectPath}`));
    console.log(chalk.white(`   Start Score: ${startScore}`));
    console.log(chalk.white(`   Strict Mode: ${options.strict}\n`));
    
    // Import these AFTER config is set
    const { runMigrationScanner } = await import('./analyzers/migration-scanner');
    const { runTemplateMigrationScanner } = await import('./analyzers/template-migration-scanner');
    
    // Run scans
    await runMigrationScanner();
    await runTemplateMigrationScanner();
    
    // Generate report
    printFinalReport();
    
    // Cleanup
    resetProject();
  });

program.parse();