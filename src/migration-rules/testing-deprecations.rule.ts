import { SourceFile } from 'ts-morph';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkTestingDeprecations(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  if (!filePath.includes('.spec.ts')) return;
  
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  if (angularVersion.major >= 15) {
    if (text.includes('TestBed.get(')) {
      console.log(`\n⚠️ [WARNING] Using deprecated TestBed.get() in: ${filePath}`);
      console.log(`   💡 Replace TestBed.get(Service) with TestBed.inject(Service)`);
    }
    
    if (text.includes('async(') && !text.includes('waitForAsync')) {
      console.log(`\n⚠️ [WARNING] Using deprecated async() test helper in: ${filePath}`);
      console.log(`   💡 Replace async() with waitForAsync()`);
    }
  }
}