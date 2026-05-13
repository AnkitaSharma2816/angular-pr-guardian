import * as fs from 'fs';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';
import * as path from 'path';

export function checkNgIfMigration(filePath: string) {
  if (!filePath.endsWith('.html')) return;
  
  // Detect Angular version from project
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  // New control flow (@if) is available in Angular 17+
  if (angularVersion.major >= 17) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    if (content.includes('*ngIf')) {
      deductPoints(
        'NgIfMigration',
        filePath,
        2,
        `Using legacy *ngIf directive (Angular ${angularVersion.major} supports @if)`,
        `Replace *ngIf with modern @if syntax: @if (condition) { }`
      );
    }
  } else {
    // For older versions, *ngIf is still valid - just info
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('*ngIf')) {
      console.log(`   ℹ️ [INFO] *ngIf detected in Angular ${angularVersion.major} project`);
      console.log(`   💡 Consider upgrading to Angular 17+ to use @if syntax\n`);
    }
  }
}