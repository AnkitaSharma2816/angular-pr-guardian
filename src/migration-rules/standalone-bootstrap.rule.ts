import { SourceFile } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkStandaloneBootstrapReadiness(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();

  if (text.includes('AppModule')) {
    deductPoints(
      'StandaloneBootstrap',
      filePath,
      4,
      'AppModule dependency detected',
      'Move toward standalone bootstrap with bootstrapApplication()'
    );
  }
}