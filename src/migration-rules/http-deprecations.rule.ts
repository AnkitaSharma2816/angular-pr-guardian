import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkHttpDeprecations(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  // Check for HttpClient without proper cleanup
  if (text.includes('.subscribe(') && 
      (text.includes('HttpClient') || text.includes('http.'))) {
    const subscribePattern = /\.subscribe\([^;]+\)/g;
    const matches = text.match(subscribePattern);
    
    if (matches && matches.length > 0) {
      // Check if there's any cleanup (takeUntil, AsyncPipe, etc.)
      const hasCleanup = text.includes('takeUntil') || 
                        text.includes('AsyncPipe') || 
                        text.includes('firstValueFrom');
      
      if (!hasCleanup) {
        deductPoints(
          'HttpCleanup',
          filePath,
          6,
          'HTTP subscriptions without proper cleanup detected',
          'Use AsyncPipe in templates or add takeUntil/unsubscribe in ngOnDestroy'
        );
      }
    }
  }
  
  // Check for deprecated .finally() on Http requests
  if (text.includes('.finally(') && text.includes('Http')) {
    deductPoints(
      'HttpFinally',
      filePath,
      3,
      'Using deprecated .finally() on HTTP requests',
      'Use finalize() operator from RxJS instead'
    );
  }
}