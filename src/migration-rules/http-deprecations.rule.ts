import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkHttpDeprecations(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  if (filePath.includes('.spec.ts')) return;
  
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  if ((text.includes('HttpClient') || text.includes('http.')) && text.includes('.subscribe(')) {
    const hasCleanup = text.includes('takeUntil') || 
                      text.includes('AsyncPipe') || 
                      text.includes('firstValueFrom') ||
                      text.includes('unsubscribe') ||
                      text.includes('destroy$');
    
    if (!hasCleanup) {
      const points = angularVersion.major >= 16 ? 6 : 4;
      deductPoints(
        'HttpCleanup',
        filePath,
        points,
        `HTTP subscriptions without proper cleanup detected (Angular ${angularVersion.major})`,
        `Use AsyncPipe in templates or add takeUntil/unsubscribe in ngOnDestroy`
      );
    }
  }
}