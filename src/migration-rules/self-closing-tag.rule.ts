import * as fs from 'fs';
import { deductPoints } from '../core/score-engine';

export function checkSelfClosingTagMigration(filePath: string) {
  if (!filePath.endsWith('.html')) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /<app-[^>]+><\/app-[^>]+>/g;
  const matches = content.match(regex);

  if (matches && matches.length > 0) {
    deductPoints(
      'SelfClosingTag',
      filePath,
      2,
      'Using non-self-closing component tags',
      'Use self-closing tags: <app-card /> instead of <app-card></app-card>'
    );
  }
}