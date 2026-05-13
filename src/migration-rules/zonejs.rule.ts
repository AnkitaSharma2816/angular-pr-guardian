import { SourceFile } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkZoneJsMigration(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  if (!text.includes('zone.js')) return;
  
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  // Zoneless available from Angular 18+
  if (angularVersion.major >= 18) {
    deductPoints(
      'ZoneJs',
      filePath,
      5,
      `zone.js dependency detected (Angular ${angularVersion.major}+ supports zoneless)`,
      `Explore zone-less Angular with signals and zoneless change detection`
    );
  } else if (angularVersion.major >= 16) {
    console.log(`   ℹ️ [INFO] zone.js detected in Angular ${angularVersion.major} project`);
    console.log(`   💡 Consider upgrading to Angular 18+ for zoneless mode\n`);
  }
}