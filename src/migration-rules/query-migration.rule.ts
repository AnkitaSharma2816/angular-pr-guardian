import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkQueryMigration(sourceFile: SourceFile) {
  const filePath = sourceFile.getFilePath();
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  // Signal queries available from Angular 17.2+
  if (angularVersion.major >= 17) {
    const decorators = sourceFile.getDescendantsOfKind(SyntaxKind.Decorator);
    
    decorators.forEach(decorator => {
      const text = decorator.getText();
      if (text.includes('@ViewChild') || text.includes('@ContentChild')) {
        deductPoints(
          'QueryMigration',
          filePath,
          3,
          `Using legacy query decorator (Angular ${angularVersion.major}+ supports viewChild())`,
          `Replace with signal queries: viewChild() or contentChild()`
        );
      }
    });
  } else {
    const text = sourceFile.getFullText();
    if (text.includes('@ViewChild') || text.includes('@ContentChild')) {
      console.log(`   ℹ️ [INFO] Legacy query decorator detected in Angular ${angularVersion.major} project`);
      console.log(`   💡 Upgrade to Angular 17+ to use signal queries\n`);
    }
  }
}