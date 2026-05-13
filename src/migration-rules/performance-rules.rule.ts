import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';
import { detectAngularVersion, findProjectRoot } from '../core/version-detector';

export function checkPerformanceRules(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  if (!text.includes('@Component')) return;
  
  const projectPath = findProjectRoot(filePath);
  const angularVersion = detectAngularVersion(projectPath);
  
  // Check for OnPush strategy (recommended for all versions)
  if (!text.includes('ChangeDetectionStrategy.OnPush')) {
    deductPoints(
      'OnPushStrategy',
      filePath,
      5,
      `Missing OnPush change detection strategy (Angular ${angularVersion.major})`,
      `Add 'changeDetection: ChangeDetectionStrategy.OnPush' to component decorator`
    );
  }
  
  // Function calls in templates - more important in newer versions
  const methodCalls = text.match(/{{[^}]*this\.[a-zA-Z]+\([^)]*\)[^}]*}}/g);
  if (methodCalls && methodCalls.length > 0) {
    const points = angularVersion.major >= 17 ? 4 : 2;
    deductPoints(
      'FunctionInTemplate',
      filePath,
      points,
      `Found ${methodCalls.length} function call(s) in template (Angular ${angularVersion.major})`,
      `Move function logic to component property or pipe. Functions run on every change detection cycle`
    );
  }
}