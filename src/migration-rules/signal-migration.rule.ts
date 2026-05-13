import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkSignalMigration(sourceFile: SourceFile) {
  const filePath = sourceFile.getFilePath();
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  // Signals available from Angular 16+
  if (angularVersion.major >= 16) {
    const identifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier);
    
    identifiers.forEach(identifier => {
      if (identifier.getText() === 'BehaviorSubject') {
        deductPoints(
          'SignalMigration',
          filePath,
          6,
          `Using BehaviorSubject instead of Angular Signals (Angular ${angularVersion.major}+ supports signals)`,
          `Replace BehaviorSubject with signal() for reactive state management`
        );
      }
    });
  } else {
    // For older versions, signals not available - just info
    const text = sourceFile.getFullText();
    if (text.includes('BehaviorSubject')) {
      console.log(`   ℹ️ [INFO] BehaviorSubject detected in Angular ${angularVersion.major} project`);
      console.log(`   💡 Upgrade to Angular 16+ to use signals\n`);
    }
  }
}