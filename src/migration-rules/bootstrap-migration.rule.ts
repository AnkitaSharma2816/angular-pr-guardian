import { SourceFile } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkBootstrapMigration(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();

  if (text.includes('bootstrapModule')) {
    deductPoints(
      'BootstrapMigration',
      filePath,
      8,
      'Using deprecated bootstrapModule() instead of bootstrapApplication()',
      'Replace NgModule bootstrap with standalone bootstrap using bootstrapApplication()'
    );
  }
}