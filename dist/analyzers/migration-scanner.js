"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrationScanner = runMigrationScanner;
const ts_project_1 = require("./ts-project");
const config_1 = require("../core/config");
// ============ CORE RULES (High Priority - 5-10 points each) ============
const bootstrap_migration_rule_1 = require("../migration-rules/bootstrap-migration.rule");
const standalone_migration_rule_1 = require("../migration-rules/standalone-migration.rule");
const topromise_rule_1 = require("../migration-rules/topromise.rule");
const signal_migration_rule_1 = require("../migration-rules/signal-migration.rule");
const inject_migration_rule_1 = require("../migration-rules/inject-migration.rule");
// ============ TEMPLATE RULES (Medium Priority - 2-4 points each) ============
const signal_input_rule_1 = require("../migration-rules/signal-input.rule");
const output_migration_rule_1 = require("../migration-rules/output-migration.rule");
const query_migration_rule_1 = require("../migration-rules/query-migration.rule");
const lazy_route_rule_1 = require("../migration-rules/lazy-route.rule");
const zonejs_rule_1 = require("../migration-rules/zonejs.rule");
// ============ PERFORMANCE RULES (Low Priority - 1-3 points each) ============
const http_deprecations_rule_1 = require("../migration-rules/http-deprecations.rule");
const router_deprecations_rule_1 = require("../migration-rules/router-deprecations.rule");
const lifecycle_deprecations_rule_1 = require("../migration-rules/lifecycle-deprecations.rule");
const performance_rules_rule_1 = require("../migration-rules/performance-rules.rule");
const ngmodule_deprecations_rule_1 = require("../migration-rules/ngmodule-deprecations.rule");
// ============ QUALITY RULES (Warning Only - 0 points, just suggestions) ============
const testing_deprecations_rule_1 = require("../migration-rules/testing-deprecations.rule");
const renderer_deprecations_rule_1 = require("../migration-rules/renderer-deprecations.rule");
const forms_deprecations_rule_1 = require("../migration-rules/forms-deprecations.rule");
const pipe_deprecations_rule_1 = require("../migration-rules/pipe-deprecations.rule");
const standalone_bootstrap_rule_1 = require("../migration-rules/standalone-bootstrap.rule");
async function runMigrationScanner() {
    const project = (0, ts_project_1.getProject)();
    const sourceFiles = project.getSourceFiles();
    const config = (0, config_1.getConfig)();
    console.log(`\n🔍 Scanning ${sourceFiles.length} TypeScript files for Angular 20 readiness...\n`);
    let filesScanned = 0;
    for (const sourceFile of sourceFiles) {
        const filePath = sourceFile.getFilePath();
        // Skip node_modules, dist, and test files (unless in strict mode)
        if (filePath.includes('node_modules') || filePath.includes('dist'))
            continue;
        if (!config.strictMode && filePath.includes('.spec.ts'))
            continue;
        filesScanned++;
        // ============ CORE RULES (Deduct points - Critical for Angular 20) ============
        (0, bootstrap_migration_rule_1.checkBootstrapMigration)(sourceFile); // 8 points max
        (0, standalone_migration_rule_1.checkStandaloneMigration)(sourceFile); // 5 points max per component
        (0, topromise_rule_1.checkToPromiseMigration)(sourceFile); // 10 points max
        (0, signal_migration_rule_1.checkSignalMigration)(sourceFile); // 6 points max
        (0, inject_migration_rule_1.checkInjectMigration)(sourceFile); // 3 points max per file
        // ============ MEDIUM PRIORITY RULES ============
        (0, signal_input_rule_1.checkSignalInputMigration)(sourceFile); // 4 points max per input
        (0, output_migration_rule_1.checkOutputMigration)(sourceFile); // 4 points max per output
        (0, query_migration_rule_1.checkQueryMigration)(sourceFile); // 3 points max per query
        (0, lazy_route_rule_1.checkLazyRouteMigration)(sourceFile); // 3 points max per route
        (0, zonejs_rule_1.checkZoneJsMigration)(sourceFile); // 5 points max
        // ============ PERFORMANCE RULES ============
        (0, http_deprecations_rule_1.checkHttpDeprecations)(sourceFile); // 6 points max
        (0, router_deprecations_rule_1.checkRouterDeprecations)(sourceFile); // 5 points max
        (0, lifecycle_deprecations_rule_1.checkLifecycleDeprecations)(sourceFile); // 5 points max
        (0, performance_rules_rule_1.checkPerformanceRules)(sourceFile); // 4 points max
        (0, ngmodule_deprecations_rule_1.checkNgModuleDeprecations)(sourceFile); // 6 points max
        // ============ QUALITY RULES (Suggestions only - no point deduction) ============
        (0, testing_deprecations_rule_1.checkTestingDeprecations)(sourceFile); // 0 points (warning only)
        (0, renderer_deprecations_rule_1.checkRendererDeprecations)(sourceFile); // 0 points (warning only)
        (0, forms_deprecations_rule_1.checkFormsDeprecations)(sourceFile); // 0 points (warning only)
        (0, pipe_deprecations_rule_1.checkPipeDeprecations)(sourceFile); // 0 points (warning only)
        (0, standalone_bootstrap_rule_1.checkStandaloneBootstrapReadiness)(sourceFile); // 0 points (warning only)
    }
    console.log(`\n✅ Scanned ${filesScanned} files\n`);
}
