import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkSignalInputMigration(sourceFile: SourceFile) {
  const decorators = sourceFile.getDescendantsOfKind(SyntaxKind.Decorator);
  const filePath = sourceFile.getFilePath();

  decorators.forEach(decorator => {
    if (decorator.getText().includes('@Input')) {
      deductPoints(
        'SignalInput',
        filePath,
        4,
        'Using @Input decorator instead of signal input',
        'Replace @Input() value: Type with input<Type>()'
      );
    }
  });
}