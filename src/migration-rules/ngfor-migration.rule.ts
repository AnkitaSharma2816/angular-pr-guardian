import * as fs from 'fs';
import { deductPoints } from '../core/score-engine';

export function checkNgForMigration(filePath: string) {
  if (!filePath.endsWith('.html')) return;

  const content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('*ngFor')) {
    deductPoints(
      'NgForMigration',
      filePath,
      2,
      'Using legacy *ngFor directive',
      'Replace *ngFor with modern @for syntax: @for (item of items; track item.id)'
    );
  }
}