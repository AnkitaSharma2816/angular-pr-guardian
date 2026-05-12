import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkToPromiseMigration(sourceFile: SourceFile) {
  const calls = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);
  const filePath = sourceFile.getFilePath();

  calls.forEach(call => {
    const expression = call.getExpression().getText();

    if (expression.includes('toPromise')) {
      deductPoints(
        'ToPromiseMigration',
        filePath,
        10,
        'Deprecated toPromise() method detected',
        'Replace toPromise() with firstValueFrom() or lastValueFrom() from rxjs'
      );
    }
  });
}