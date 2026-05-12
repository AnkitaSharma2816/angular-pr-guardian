import * as path from 'path';

export interface ProjectConfig {
  projectPath: string;
  tsConfigPath: string;
  srcPath: string;
  startScore: number;
  strictMode: boolean;
}

let currentConfig: ProjectConfig | null = null;

export function setConfig(projectPath: string, startScore: number = 100, strictMode: boolean = true) {
  currentConfig = {
    projectPath,
    tsConfigPath: path.join(projectPath, 'tsconfig.json'),
    srcPath: path.join(projectPath, 'src'),
    startScore,
    strictMode
  };
}

export function getConfig(): ProjectConfig {
  if (!currentConfig) {
    // Return a default config instead of throwing error
    const defaultPath = process.cwd();
    console.log(chalk.yellow(`⚠ Config not initialized. Using default config with current directory: ${defaultPath}\n`));
    
    // Set default config
    setConfig(defaultPath, 100, true);
    return currentConfig!;
  }
  return currentConfig;
}

// Import chalk dynamically
import chalk from 'chalk';