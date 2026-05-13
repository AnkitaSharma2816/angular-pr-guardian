import { SourceFile } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkBootstrapMigration(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  // Only check main.ts
  if (!filePath.includes('main.ts')) return;
  
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  // Angular 17+ should use bootstrapApplication
  if (angularVersion.major >= 17 && text.includes('bootstrapModule')) {
    deductPoints(
      'BootstrapMigration',
      filePath,
      8,
      `Using deprecated bootstrapModule() for Angular ${angularVersion.major}`,
      `Replace with bootstrapApplication() for standalone components`
    );
  }
  
  // Angular 16 and below - bootstrapModule is acceptable (warning only)
  if (angularVersion.major <= 16 && text.includes('bootstrapModule')) {
    console.log(`   ℹ️ [INFO] bootstrapModule() is acceptable for Angular ${angularVersion.major}`);
    console.log(`   💡 Consider upgrading to Angular 17+ for standalone bootstrap\n`);
  }
}