import * as fs from 'fs';
import { deductPoints } from '../core/score-engine';

export function checkBuildSystemMigration(angularJsonPath: string) {
  if (!fs.existsSync(angularJsonPath)) return;

  const content = fs.readFileSync(angularJsonPath, 'utf-8');

  if (content.includes('@angular-devkit/build-angular:browser')) {
    deductPoints(
      'BuildSystem',
      angularJsonPath,
      6,
      'Legacy webpack builder detected',
      'Use Angular application builder (esbuild/Vite based)'
    );
  }
}