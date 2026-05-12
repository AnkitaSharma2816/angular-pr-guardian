import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkLifecycleDeprecations(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  // Check for ngDoCheck (often indicates performance issues)
  if (text.includes('ngDoCheck')) {
    deductPoints(
      'NgDoCheck',
      filePath,
      5,
      'Using ngDoCheck lifecycle hook',
      'Use OnPush change detection with signals instead of ngDoCheck'
    );
  }
  
  // Check for ngOnChanges without proper typing
  if (text.includes('SimpleChanges') && !text.includes('SimpleChanges')) {
    deductPoints(
      'SimpleChanges',
      filePath,
      2,
      'ngOnChanges without proper typing',
      'Type SimpleChanges correctly: ngOnChanges(changes: SimpleChanges)'
    );
  }
}