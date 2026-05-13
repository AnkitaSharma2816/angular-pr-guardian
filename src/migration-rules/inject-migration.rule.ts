import { SourceFile } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkInjectMigration(sourceFile: SourceFile) {
  const filePath = sourceFile.getFilePath();
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  // inject() available from Angular 14+
  if (angularVersion.major >= 14) {
    const classes = sourceFile.getClasses();
    
    classes.forEach(classDeclaration => {
      const constructor = classDeclaration.getConstructors()[0];
      if (!constructor) return;
      
      const params = constructor.getParameters();
      if (params.length > 0) {
        deductPoints(
          'InjectMigration',
          filePath,
          3,
          `Using constructor injection instead of inject() function (Angular ${angularVersion.major}+ supports inject())`,
          `Replace constructor parameters with 'const service = inject(ServiceType)'`
        );
      }
    });
  }
  // For Angular 13 and below, constructor injection is standard - no deduction
}