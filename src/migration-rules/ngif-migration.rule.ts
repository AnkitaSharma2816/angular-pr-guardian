import fs from 'fs';
import { deductPoints } from '../core/score-engine';

export function checkNgIfMigration(filePath: string) {
  if (!filePath.endsWith('.html')) return;

  const content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('*ngIf')) {
    deductPoints(
      'NgIfMigration',
      filePath,
      2,
      'Using legacy *ngIf directive',
      'Replace *ngIf with modern @if syntax: @if (condition) { }'
    );
  }
}