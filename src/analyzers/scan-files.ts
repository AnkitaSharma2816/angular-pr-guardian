import { globSync } from 'glob';
import { checkFileNameRule } from '../rules/file-name.rule';

export function scanFiles() {
 const files = globSync('D:/country-viewer/src/**/*.{ts,html}');

  console.log(files);

  for (const file of files) {
    checkFileNameRule(file);
   // checkComponentSizeRule(file);
  }
}