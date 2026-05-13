import { SourceFile } from 'ts-morph';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkStandaloneBootstrapReadiness(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  if (!filePath.includes('main.ts')) return;
  
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  if (angularVersion.major >= 17 && text.includes('AppModule')) {
    console.log(`\n⚠️ [WARNING] AppModule dependency detected in Angular ${angularVersion.major}`);
    console.log(`   💡 Migrate to standalone bootstrap: bootstrapApplication(AppComponent)`);
  }
}