// Main exports
export { setConfig, getConfig, ProjectConfig } from './core/config';
export { scoreEngine, deductPoints, addPoints } from './core/score-engine';
export { printFinalReport } from './core/final-report';
export { runMigrationScanner } from './analyzers/migration-scanner';
export { runTemplateMigrationScanner } from './analyzers/template-migration-scanner';
export { getProject, resetProject } from './analyzers/ts-project';

// Export all rules individually (instead of as a namespace)
export * as bootstrapRule from './migration-rules/bootstrap-migration.rule';
export * as injectRule from './migration-rules/inject-migration.rule';
export * as lazyRouteRule from './migration-rules/lazy-route.rule';
export * as ngForRule from './migration-rules/ngfor-migration.rule';
export * as ngIfRule from './migration-rules/ngif-migration.rule';
export * as outputRule from './migration-rules/output-migration.rule';
export * as queryRule from './migration-rules/query-migration.rule';
export * as selfClosingTagRule from './migration-rules/self-closing-tag.rule';
export * as signalInputRule from './migration-rules/signal-input.rule';
export * as signalMigrationRule from './migration-rules/signal-migration.rule';
export * as standaloneBootstrapRule from './migration-rules/standalone-bootstrap.rule';
export * as standaloneMigrationRule from './migration-rules/standalone-migration.rule';
export * as toPromiseRule from './migration-rules/topromise.rule';
export * as zoneJsRule from './migration-rules/zonejs.rule';