import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkNgModuleDeprecations(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  // Check for forRoot() pattern (can often be simplified)
  if (text.includes('forRoot(')) {
    deductPoints(
      'ForRoot',
      filePath,
      3,
      'Using forRoot() pattern in NgModule',
      'Consider moving to standalone components with provide pattern'
    );
  }
  
  // Check for entryComponents (deprecated)
  if (text.includes('entryComponents')) {
    deductPoints(
      'EntryComponents',
      filePath,
      6,
      'Using deprecated entryComponents array',
      'Remove entryComponents - no longer needed in Ivy'
    );
  }
}