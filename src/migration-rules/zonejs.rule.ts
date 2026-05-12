import { SourceFile } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkZoneJsMigration(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();

  if (text.includes('zone.js')) {
    deductPoints(
      'ZoneJs',
      filePath,
      5,
      'zone.js dependency detected',
      'Explore zone-less Angular with signals and zoneless change detection'
    );
  }
}