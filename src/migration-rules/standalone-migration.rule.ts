import { SourceFile } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkStandaloneMigration(sourceFile: SourceFile) {
  const classes = sourceFile.getClasses();
  const filePath = sourceFile.getFilePath();

  classes.forEach(classDeclaration => {
    const decorators = classDeclaration.getDecorators();
    const componentDecorator = decorators.find(d => d.getName() === 'Component');

    if (!componentDecorator) return;

    const text = componentDecorator.getText();

    if (!text.includes('standalone')) {
      deductPoints(
        'StandaloneComponents',
        filePath,
        5,
        'Component is not standalone',
        'Add `standalone: true` to component decorator and import dependencies directly'
      );
    }
  });
}