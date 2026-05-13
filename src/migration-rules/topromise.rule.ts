import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkToPromiseMigration(sourceFile: SourceFile) {
  const calls = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);
  const filePath = sourceFile.getFilePath();
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  // toPromise() deprecated from Angular 15+
  if (angularVersion.major >= 15) {
    calls.forEach(call => {
      const expression = call.getExpression().getText();
      
      if (expression.includes('toPromise')) {
        deductPoints(
          'ToPromiseMigration',
          filePath,
          10,
          `Deprecated toPromise() method detected (Angular ${angularVersion.major}+ recommends firstValueFrom)`,
          `Replace toPromise() with firstValueFrom() or lastValueFrom() from rxjs`
        );
      }
    });
  }
}