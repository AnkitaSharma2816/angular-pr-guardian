import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkSignalInputMigration(sourceFile: SourceFile) {
  const filePath = sourceFile.getFilePath();
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  // Signal inputs available from Angular 17.1+
  if (angularVersion.major >= 17) {
    const decorators = sourceFile.getDescendantsOfKind(SyntaxKind.Decorator);
    
    decorators.forEach(decorator => {
      if (decorator.getText().includes('@Input')) {
        deductPoints(
          'SignalInput',
          filePath,
          4,
          `Using @Input decorator instead of signal input (Angular ${angularVersion.major}+ supports input())`,
          `Replace @Input() value: Type with input<Type>()`
        );
      }
    });
  } else {
    // For older versions, @Input is still valid
    const text = sourceFile.getFullText();
    if (text.includes('@Input')) {
      console.log(`   ℹ️ [INFO] @Input decorator detected in Angular ${angularVersion.major} project`);
      console.log(`   💡 Upgrade to Angular 17+ to use signal inputs\n`);
    }
  }
}