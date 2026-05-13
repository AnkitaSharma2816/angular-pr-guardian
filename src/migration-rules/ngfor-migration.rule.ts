import * as fs from 'fs';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkNgForMigration(filePath: string) {
  if (!filePath.endsWith('.html')) return;
  
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  if (angularVersion.major >= 17) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    if (content.includes('*ngFor')) {
      deductPoints(
        'NgForMigration',
        filePath,
        2,
        `Using legacy *ngFor directive (Angular ${angularVersion.major} supports @for)`,
        `Replace *ngFor with modern @for syntax: @for (item of items; track item.id)`
      );
    }
  } else {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('*ngFor')) {
      console.log(`   ℹ️ [INFO] *ngFor detected in Angular ${angularVersion.major} project`);
      console.log(`   💡 Consider upgrading to Angular 17+ to use @for syntax\n`);
    }
  }
}