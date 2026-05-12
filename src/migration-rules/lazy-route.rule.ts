import { SourceFile } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkLazyRouteMigration(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  if (!filePath.includes('routes') && !filePath.includes('app-routing')) return;
  
  const componentPattern = /component:\s*(\w+)/g;
  const loadComponentPattern = /loadComponent/g;
  
  const hasDirectComponents = componentPattern.test(text);
  const hasLazyComponents = loadComponentPattern.test(text);
  
  if (hasDirectComponents && !hasLazyComponents) {
    deductPoints(
      'LazyLoading',
      filePath,
      3,
      'Components loaded eagerly instead of lazy loading',
      'Use loadComponent: () => import("./component") instead of component: ComponentClass'
    );
  }
}