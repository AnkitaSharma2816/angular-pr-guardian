import { globSync } from 'glob';
import { getConfig } from '../core/config';
import * as path from 'path';

import { checkNgIfMigration } from '../migration-rules/ngif-migration.rule';
import { checkNgForMigration } from '../migration-rules/ngfor-migration.rule';
import { checkSelfClosingTagMigration } from '../migration-rules/self-closing-tag.rule';

export async function runTemplateMigrationScanner() {
  const config = getConfig();
  const pattern = path.join(config.srcPath, '**/*.html');
  const files = globSync(pattern, { absolute: true });
  
  console.log(`\n🎨 Scanning ${files.length} template files...\n`);
  
  for (const file of files) {
    checkNgIfMigration(file);
    checkNgForMigration(file);
    checkSelfClosingTagMigration(file);
  }
}