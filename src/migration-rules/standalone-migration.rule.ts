import { SourceFile } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkStandaloneMigration(sourceFile: SourceFile) {
  const filePath = sourceFile.getFilePath();
  
  // Skip non-component files
  if (!filePath.includes('.component.ts')) return;
  
  // Detect Angular version from project
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  const classes = sourceFile.getClasses();
  
  classes.forEach(classDeclaration => {
    const decorators = classDeclaration.getDecorators();
    const componentDecorator = decorators.find(d => d.getName() === 'Component');
    
    if (!componentDecorator) return;
    
    const text = componentDecorator.getText();
    
    // Check for explicit standalone: false (ALWAYS a problem)
    if (text.includes('standalone: false')) {
      deductPoints(
        'StandaloneComponents',
        filePath,
        8,
        `Component has explicit 'standalone: false' which is deprecated in Angular ${angularVersion.major}`,
        `Remove 'standalone: false' or change to 'standalone: true'`
      );
      return;
    }
    
    // For Angular 17+, standalone is default - only flag if explicitly false
    if (angularVersion.major >= 17) {
      // No deduction needed - standalone is default
      // But add info message if they're still using NgModule pattern
      if (text.includes('imports:') && !text.includes('standalone: true')) {
        console.log(`   ℹ️ [INFO] Component uses imports without standalone flag - standalone is default in Angular ${angularVersion.major}`);
        console.log(`   💡 You can remove NgModule and use standalone components directly\n`);
      }
      return;
    }
    
    // For Angular 16, standalone is optional but recommended
    if (angularVersion.major === 16) {
      if (!text.includes('standalone: true')) {
        deductPoints(
          'StandaloneComponents',
          filePath,
          2,
          `Component doesn't use standalone (Angular 16 - optional but recommended)`,
          `Consider adding 'standalone: true' to prepare for future versions`
        );
      }
      return;
    }
    
    // For Angular 15 and below, missing standalone requires NgModule
    if (angularVersion.major <= 15) {
      if (!text.includes('standalone: true') && !text.includes('standalone: false')) {
        deductPoints(
          'StandaloneComponents',
          filePath,
          5,
          `Component is not standalone (Angular ${angularVersion.major} requires NgModule)`,
          `Add 'standalone: true' to component decorator for better tree-shaking`
        );
      }
    }
  });
}