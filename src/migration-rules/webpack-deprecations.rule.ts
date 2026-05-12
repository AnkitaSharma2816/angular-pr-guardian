import * as fs from 'fs';
import { deductPoints } from '../core/score-engine';

export function checkWebpackDeprecations(projectPath: string) {
  // Check for custom webpack config
  const webpackConfigs = [
    'webpack.config.js',
    'webpack.config.ts',
    'custom-webpack.config.js'
  ];
  
  for (const config of webpackConfigs) {
    const configPath = `${projectPath}/${config}`;
    if (fs.existsSync(configPath)) {
      deductPoints(
        'CustomWebpack',
        configPath,
        8,
        'Custom webpack configuration detected',
        'Use Angular esbuild builder instead of custom webpack'
      );
    }
  }
}