import { getProject } from './ts-project';
import { deductPoints } from '../core/score-engine';
import { getConfig } from '../core/config';
import * as path from 'path';

// Import all rules
import { checkToPromiseMigration } from '../migration-rules/topromise.rule';
import { checkSignalMigration } from '../migration-rules/signal-migration.rule';
import { checkStandaloneMigration } from '../migration-rules/standalone-migration.rule';
import { checkBootstrapMigration } from '../migration-rules/bootstrap-migration.rule';
import { checkInjectMigration } from '../migration-rules/inject-migration.rule';
import { checkLazyRouteMigration } from '../migration-rules/lazy-route.rule';
import { checkOutputMigration } from '../migration-rules/output-migration.rule';
import { checkQueryMigration } from '../migration-rules/query-migration.rule';
import { checkSignalInputMigration } from '../migration-rules/signal-input.rule';
import { checkStandaloneBootstrapReadiness } from '../migration-rules/standalone-bootstrap.rule';
import { checkZoneJsMigration } from '../migration-rules/zonejs.rule';
import { checkOnPushMigration } from '../migration-rules/onpush.rule';
import { checkAsyncPipeMigration } from '../migration-rules/asyncpipe.rule';

export async function runMigrationScanner() {
  const project = getProject();
  const sourceFiles = project.getSourceFiles();
  const config = getConfig();
  
  console.log(`\n🔍 Scanning ${sourceFiles.length} TypeScript files...\n`);
  
  for (const sourceFile of sourceFiles) {
    const filePath = sourceFile.getFilePath();
    
    // Skip node_modules and dist
    if (filePath.includes('node_modules') || filePath.includes('dist')) continue;
    
    // Apply each rule
    checkToPromiseMigration(sourceFile);
    checkSignalMigration(sourceFile);
    checkStandaloneMigration(sourceFile);
    checkInjectMigration(sourceFile);
    checkSignalInputMigration(sourceFile);
    checkOutputMigration(sourceFile);
    checkQueryMigration(sourceFile);
    checkBootstrapMigration(sourceFile);
    checkLazyRouteMigration(sourceFile);
    checkZoneJsMigration(sourceFile);
    checkStandaloneBootstrapReadiness(sourceFile);
    checkOnPushMigration(sourceFile);
    checkAsyncPipeMigration(sourceFile);
  }
}