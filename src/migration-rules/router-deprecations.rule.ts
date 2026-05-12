import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkRouterDeprecations(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  // Check for deprecated CanActivate guards
  if (text.includes('CanActivate') && !text.includes('CanActivateFn')) {
    deductPoints(
      'CanActivate',
      filePath,
      5,
      'Using deprecated CanActivate class guard',
      'Replace CanActivate with functional guard: CanActivateFn'
    );
  }
  
  // Check for queryParams vs queryParamMap
  if (text.includes('queryParams') && !text.includes('queryParamMap')) {
    deductPoints(
      'QueryParams',
      filePath,
      3,
      'Using queryParams instead of queryParamMap',
      'Use queryParamMap for better type safety and performance'
    );
  }
  
  // Check for params vs paramMap
  if (text.includes('.params') && text.includes('subscribe')) {
    deductPoints(
      'RouteParams',
      filePath,
      3,
      'Using params observable instead of paramMap',
      'Use paramMap instead of params for better performance'
    );
  }
}