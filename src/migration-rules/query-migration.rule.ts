import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkQueryMigration(sourceFile: SourceFile) {
  const decorators = sourceFile.getDescendantsOfKind(SyntaxKind.Decorator);
  const filePath = sourceFile.getFilePath();

  decorators.forEach(decorator => {
    const text = decorator.getText();
    if (text.includes('@ViewChild') || text.includes('@ContentChild')) {
      deductPoints(
        'QueryMigration',
        filePath,
        3,
        'Using legacy query decorator (@ViewChild/@ContentChild)',
        'Replace with signal queries: viewChild() or contentChild()'
      );
    }
  });
}