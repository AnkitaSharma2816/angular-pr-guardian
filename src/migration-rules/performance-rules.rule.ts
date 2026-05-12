import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkPerformanceRules(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  // Check for missing trackBy in ngFor
  if (text.includes('*ngFor') && !text.includes('trackBy')) {
    deductPoints(
      'MissingTrackBy',
      filePath,
      3,
      '*ngFor without trackBy',
      'Add trackBy function to improve performance: *ngFor="let item of items; trackBy: trackById"'
    );
  }
  
  // Check for function calls in templates
  const templatePattern = /{{[^}]*\([^)]*\)[^}]*}}/g;
  if (templatePattern.test(text)) {
    deductPoints(
      'FunctionInTemplate',
      filePath,
      4,
      'Function call in template binding',
      'Move function logic to component property or pipe for better performance'
    );
  }
}