import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkOutputMigration(sourceFile: SourceFile) {
  const decorators = sourceFile.getDescendantsOfKind(SyntaxKind.Decorator);
  const filePath = sourceFile.getFilePath();

  decorators.forEach(decorator => {
    if (decorator.getText().includes('@Output')) {
      deductPoints(
        'OutputMigration',
        filePath,
        4,
        'Using @Output decorator instead of output() function',
        'Replace @Output() event = new EventEmitter() with event = output()'
      );
    }
  });
}