import { getProject } from './ts-project';
import { getConfig } from '../core/config';

// ============ CORE RULES (High Priority - 5-10 points each) ============
import { checkBootstrapMigration } from '../migration-rules/bootstrap-migration.rule';
import { checkStandaloneMigration } from '../migration-rules/standalone-migration.rule';
import { checkToPromiseMigration } from '../migration-rules/topromise.rule';
import { checkSignalMigration } from '../migration-rules/signal-migration.rule';
import { checkInjectMigration } from '../migration-rules/inject-migration.rule';

// ============ TEMPLATE RULES (Medium Priority - 2-4 points each) ============
import { checkSignalInputMigration } from '../migration-rules/signal-input.rule';
import { checkOutputMigration } from '../migration-rules/output-migration.rule';
import { checkQueryMigration } from '../migration-rules/query-migration.rule';
import { checkLazyRouteMigration } from '../migration-rules/lazy-route.rule';
import { checkZoneJsMigration } from '../migration-rules/zonejs.rule';

// ============ PERFORMANCE RULES (Low Priority - 1-3 points each) ============
import { checkHttpDeprecations } from '../migration-rules/http-deprecations.rule';
import { checkRouterDeprecations } from '../migration-rules/router-deprecations.rule';
import { checkLifecycleDeprecations } from '../migration-rules/lifecycle-deprecations.rule';
import { checkPerformanceRules } from '../migration-rules/performance-rules.rule';
import { checkNgModuleDeprecations } from '../migration-rules/ngmodule-deprecations.rule';

// ============ QUALITY RULES (Warning Only - 0 points, just suggestions) ============
import { checkTestingDeprecations } from '../migration-rules/testing-deprecations.rule';
import { checkRendererDeprecations } from '../migration-rules/renderer-deprecations.rule';
import { checkFormsDeprecations } from '../migration-rules/forms-deprecations.rule';
import { checkPipeDeprecations } from '../migration-rules/pipe-deprecations.rule';
import { checkStandaloneBootstrapReadiness } from '../migration-rules/standalone-bootstrap.rule';

export async function runMigrationScanner() {
  const project = getProject();
  const sourceFiles = project.getSourceFiles();
  const config = getConfig();
  
  console.log(`\n🔍 Scanning ${sourceFiles.length} TypeScript files for Angular 20 readiness...\n`);
  
  let filesScanned = 0;
  
  for (const sourceFile of sourceFiles) {
    const filePath = sourceFile.getFilePath();
    
    // Skip node_modules, dist, and test files (unless in strict mode)
    if (filePath.includes('node_modules') || filePath.includes('dist')) continue;
    if (!config.strictMode && filePath.includes('.spec.ts')) continue;
    
    filesScanned++;
    
    // ============ CORE RULES (Deduct points - Critical for Angular 20) ============
    checkBootstrapMigration(sourceFile);        // 8 points max
    checkStandaloneMigration(sourceFile);       // 5 points max per component
    checkToPromiseMigration(sourceFile);        // 10 points max
    checkSignalMigration(sourceFile);           // 6 points max
    checkInjectMigration(sourceFile);           // 3 points max per file
    
    // ============ MEDIUM PRIORITY RULES ============
    checkSignalInputMigration(sourceFile);      // 4 points max per input
    checkOutputMigration(sourceFile);           // 4 points max per output
    checkQueryMigration(sourceFile);            // 3 points max per query
    checkLazyRouteMigration(sourceFile);        // 3 points max per route
    checkZoneJsMigration(sourceFile);           // 5 points max
    
    // ============ PERFORMANCE RULES ============
    checkHttpDeprecations(sourceFile);          // 6 points max
    checkRouterDeprecations(sourceFile);        // 5 points max
    checkLifecycleDeprecations(sourceFile);     // 5 points max
    checkPerformanceRules(sourceFile);          // 4 points max
    checkNgModuleDeprecations(sourceFile);      // 6 points max
    
    // ============ QUALITY RULES (Suggestions only - no point deduction) ============
    checkTestingDeprecations(sourceFile);       // 0 points (warning only)
    checkRendererDeprecations(sourceFile);      // 0 points (warning only)
    checkFormsDeprecations(sourceFile);         // 0 points (warning only)
    checkPipeDeprecations(sourceFile);          // 0 points (warning only)
    checkStandaloneBootstrapReadiness(sourceFile); // 0 points (warning only)
  }
  
  console.log(`\n✅ Scanned ${filesScanned} files\n`);
}