import { Project } from 'ts-morph';
import { getConfig } from '../core/config';
import * as fs from 'fs';

let projectInstance: Project | null = null;

export function getProject(): Project {
  if (projectInstance) return projectInstance;
  
  const config = getConfig();
  
  if (!fs.existsSync(config.tsConfigPath)) {
    console.error(`❌ tsconfig.json not found at: ${config.tsConfigPath}`);
    process.exit(1);
  }
  
  projectInstance = new Project({
    tsConfigFilePath: config.tsConfigPath
  });
  
  return projectInstance;
}

export function resetProject() {
  projectInstance = null;
}