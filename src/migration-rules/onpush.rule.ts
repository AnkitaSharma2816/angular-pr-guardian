import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkOnPushMigration(sourceFile: SourceFile) {
  const classes = sourceFile.getClasses();
  
  classes.forEach(classDeclaration => {
    const decorators = classDeclaration.getDecorators();
    const componentDecorator = decorators.find(d => d.getName() === 'Component');
    
    if (componentDecorator) {
      const text = componentDecorator.getText();
      
      if (!text.includes('ChangeDetectionStrategy.OnPush')) {
        deductPoints(
          'OnPushStrategy',
          sourceFile.getFilePath(),
          5,
          'Missing OnPush change detection strategy',
          'Add `changeDetection: ChangeDetectionStrategy.OnPush` to your component decorator for better performance'
        );
      }
    }
  });
}