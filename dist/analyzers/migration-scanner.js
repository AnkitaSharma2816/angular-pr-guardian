"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrationScanner = runMigrationScanner;
const ts_project_1 = require("./ts-project");
const config_1 = require("../core/config");
// Import all rules
const topromise_rule_1 = require("../migration-rules/topromise.rule");
const signal_migration_rule_1 = require("../migration-rules/signal-migration.rule");
const standalone_migration_rule_1 = require("../migration-rules/standalone-migration.rule");
const bootstrap_migration_rule_1 = require("../migration-rules/bootstrap-migration.rule");
const inject_migration_rule_1 = require("../migration-rules/inject-migration.rule");
const lazy_route_rule_1 = require("../migration-rules/lazy-route.rule");
const output_migration_rule_1 = require("../migration-rules/output-migration.rule");
const query_migration_rule_1 = require("../migration-rules/query-migration.rule");
const signal_input_rule_1 = require("../migration-rules/signal-input.rule");
const standalone_bootstrap_rule_1 = require("../migration-rules/standalone-bootstrap.rule");
const zonejs_rule_1 = require("../migration-rules/zonejs.rule");
const onpush_rule_1 = require("../migration-rules/onpush.rule");
const asyncpipe_rule_1 = require("../migration-rules/asyncpipe.rule");
async function runMigrationScanner() {
    const project = (0, ts_project_1.getProject)();
    const sourceFiles = project.getSourceFiles();
    const config = (0, config_1.getConfig)();
    console.log(`\n🔍 Scanning ${sourceFiles.length} TypeScript files...\n`);
    for (const sourceFile of sourceFiles) {
        const filePath = sourceFile.getFilePath();
        // Skip node_modules and dist
        if (filePath.includes('node_modules') || filePath.includes('dist'))
            continue;
        // Apply each rule
        (0, topromise_rule_1.checkToPromiseMigration)(sourceFile);
        (0, signal_migration_rule_1.checkSignalMigration)(sourceFile);
        (0, standalone_migration_rule_1.checkStandaloneMigration)(sourceFile);
        (0, inject_migration_rule_1.checkInjectMigration)(sourceFile);
        (0, signal_input_rule_1.checkSignalInputMigration)(sourceFile);
        (0, output_migration_rule_1.checkOutputMigration)(sourceFile);
        (0, query_migration_rule_1.checkQueryMigration)(sourceFile);
        (0, bootstrap_migration_rule_1.checkBootstrapMigration)(sourceFile);
        (0, lazy_route_rule_1.checkLazyRouteMigration)(sourceFile);
        (0, zonejs_rule_1.checkZoneJsMigration)(sourceFile);
        (0, standalone_bootstrap_rule_1.checkStandaloneBootstrapReadiness)(sourceFile);
        (0, onpush_rule_1.checkOnPushMigration)(sourceFile);
        (0, asyncpipe_rule_1.checkAsyncPipeMigration)(sourceFile);
    }
}
