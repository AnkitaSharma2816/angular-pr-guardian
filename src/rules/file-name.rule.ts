import * as path from 'path';

export function checkFileNameRule(filePath: string) {
  const fileName = path.basename(filePath);
  
  // Rule: Component files should be kebab-case
  if (fileName.includes('.component.ts') && !isKebabCase(fileName)) {
    console.log(`⚠ File name should be kebab-case: ${fileName}`);
  }
  
  // Rule: Service files should have .service.ts suffix
  if (fileName.includes('.service.ts') && !fileName.endsWith('.service.ts')) {
    console.log(`⚠ Service files should end with .service.ts: ${fileName}`);
  }
}

function isKebabCase(str: string): boolean {
  return /^[a-z]+(-[a-z]+)*(\.[a-z]+)?$/.test(str);
}