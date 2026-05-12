import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkFormsDeprecations(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  // Check for ngModel without name (deprecated)
  if (text.includes('[(ngModel)]') && !text.includes('name=')) {
    deductPoints(
      'NgModelName',
      filePath,
      4,
      'Using ngModel without name attribute in form',
      'Add name attribute to form controls: <input [(ngModel)]="value" name="field">'
    );
  }
  
  // Check for deprecated form control status methods
  if (text.includes('.pristine') || text.includes('.dirty') ||
      text.includes('.valid') || text.includes('.invalid')) {
    // This is still valid, but suggest using statusChanges observable
    if (text.includes('statusChanges')) {
      // Already using good pattern
    } else {
      deductPoints(
        'FormStatus',
        filePath,
        2,
        'Direct access to form status properties',
        'Consider using statusChanges observable for reactive form status handling'
      );
    }
  }
}