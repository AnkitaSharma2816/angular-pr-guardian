import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkAsyncPipeMigration(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  // Check for manual subscriptions without AsyncPipe
  const subscribeMatches = text.match(/\.subscribe\(/g);
  const asyncPipeMatches = text.match(/\|\s*async/g);
  
  if (subscribeMatches && subscribeMatches.length > 0) {
    const manualSubscriptions = subscribeMatches.length;
    const asyncUsage = asyncPipeMatches?.length || 0;
    
    if (manualSubscriptions > asyncUsage) {
      deductPoints(
        'AsyncPipe',
        filePath,
        4,
        `Found ${manualSubscriptions} manual subscription(s) without AsyncPipe`,
        'Use AsyncPipe in templates and let Angular handle subscriptions automatically'
      );
    }
  }
}