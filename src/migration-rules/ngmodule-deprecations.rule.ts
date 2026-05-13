import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkNgModuleDeprecations(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  if (!text.includes('@NgModule')) return;
  
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  // entryComponents deprecated in Angular 16+
  if (angularVersion.major >= 16 && text.includes('entryComponents')) {
    deductPoints(
      'EntryComponentsDeprecated',
      filePath,
      6,
      `Using deprecated entryComponents array (Angular ${angularVersion.major})`,
      `Remove entryComponents - no longer needed in Angular Ivy`
    );
  }
  
  // forRoot pattern - recommend standalone for v17+
  if (angularVersion.major >= 17 && text.includes('forRoot(')) {
    deductPoints(
      'ForRootPattern',
      filePath,
      3,
      `Using forRoot() pattern in NgModule (Angular ${angularVersion.major} prefers standalone)`,
      `Consider moving to standalone components with provide pattern`
    );
  }
}