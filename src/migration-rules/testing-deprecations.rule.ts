import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkTestingDeprecations(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  if (!filePath.includes('.spec.ts')) return;
  
  // Check for TestBed.inject vs TestBed.get
  if (text.includes('TestBed.get(')) {
    deductPoints(
      'TestBedGet',
      filePath,
      4,
      'Using deprecated TestBed.get()',
      'Replace TestBed.get(Service) with TestBed.inject(Service)'
    );
  }
  
  // Check for async() vs waitForAsync()
  if (text.includes('async(') && !text.includes('waitForAsync')) {
    deductPoints(
      'AsyncTest',
      filePath,
      4,
      'Using deprecated async() test helper',
      'Replace async() with waitForAsync()'
    );
  }
}