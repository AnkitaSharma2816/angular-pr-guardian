import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkPipeDeprecations(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  // Check for async pipe without proper error handling
  if (text.includes('| async') && !text.includes('| async as ')) {
    deductPoints(
      'AsyncPipe',
      filePath,
      2,
      'Async pipe without alias (as) syntax',
      'Use "as" syntax: {{ observable$ | async as data }} for cleaner templates'
    );
  }
  
  // Check for impure pipes that could be pure
  if (text.includes('pure: false') && !text.includes('date') && !text.includes('async')) {
    deductPoints(
      'ImpurePipe',
      filePath,
      4,
      'Using impure pipe unnecessarily',
      'Make pipe pure (pure: true) unless you absolutely need impure behavior'
    );
  }
}