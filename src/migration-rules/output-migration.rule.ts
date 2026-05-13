import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkOutputMigration(sourceFile: SourceFile) {
  const filePath = sourceFile.getFilePath();
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  // output() function available from Angular 17.1+
  if (angularVersion.major >= 17) {
    const decorators = sourceFile.getDescendantsOfKind(SyntaxKind.Decorator);
    
    decorators.forEach(decorator => {
      if (decorator.getText().includes('@Output')) {
        deductPoints(
          'OutputMigration',
          filePath,
          4,
          `Using @Output decorator instead of output() function (Angular ${angularVersion.major}+ supports output())`,
          `Replace @Output() event = new EventEmitter() with event = output()`
        );
      }
    });
  } else {
    const text = sourceFile.getFullText();
    if (text.includes('@Output')) {
      console.log(`   ℹ️ [INFO] @Output decorator detected in Angular ${angularVersion.major} project`);
      console.log(`   💡 Upgrade to Angular 17+ to use output() function\n`);
    }
  }
}