import { SourceFile } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkInjectMigration(sourceFile: SourceFile) {
  const classes = sourceFile.getClasses();
  const filePath = sourceFile.getFilePath();

  classes.forEach(classDeclaration => {
    const constructor = classDeclaration.getConstructors()[0];
    if (!constructor) return;

    const params = constructor.getParameters();
    if (params.length > 0) {
      deductPoints(
        'InjectMigration',
        filePath,
        3,
        'Using constructor injection instead of inject() function',
        'Replace constructor parameters with `const service = inject(ServiceType)`'
      );
    }
  });
}