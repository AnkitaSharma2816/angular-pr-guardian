import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkSignalMigration(sourceFile: SourceFile) {
  const identifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier);
  const filePath = sourceFile.getFilePath();

  identifiers.forEach(identifier => {
    if (identifier.getText() === 'BehaviorSubject') {
      deductPoints(
        'SignalMigration',
        filePath,
        6,
        'Using BehaviorSubject instead of Angular Signals',
        'Replace BehaviorSubject with signal() for reactive state management'
      );
    }
  });
}