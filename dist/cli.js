#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
// Import after chalk is defined
const config_1 = require("./core/config");
const scan_files_1 = require("./analyzers/scan-files");
const final_report_1 = require("./core/final-report");
const ts_project_1 = require("./analyzers/ts-project");
const program = new commander_1.Command();
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
    (0, config_1.setConfig)(projectPath);
    console.log(`🔍 Scanning project: ${projectPath}`);
    (0, scan_files_1.scanFiles)();
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
    (0, config_1.setConfig)(projectPath, startScore, options.strict);
    console.log(chalk_1.default.bold(`\n Angular PR Guardian - Migration Readiness Check\n`));
    console.log(chalk_1.default.white(`   Project: ${projectPath}`));
    console.log(chalk_1.default.white(`   Start Score: ${startScore}`));
    console.log(chalk_1.default.white(`   Strict Mode: ${options.strict}\n`));
    // Import these AFTER config is set
    const { runMigrationScanner } = await Promise.resolve().then(() => __importStar(require('./analyzers/migration-scanner')));
    const { runTemplateMigrationScanner } = await Promise.resolve().then(() => __importStar(require('./analyzers/template-migration-scanner')));
    // Run scans
    await runMigrationScanner();
    await runTemplateMigrationScanner();
    // Generate report
    (0, final_report_1.printFinalReport)();
    // Cleanup
    (0, ts_project_1.resetProject)();
});
program.parse();
