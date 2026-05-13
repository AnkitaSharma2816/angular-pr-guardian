import * as fs from 'fs';
import * as path from 'path';

export interface AngularVersion {
  major: number;
  minor: number;
  patch: number;
  isStandaloneByDefault: boolean;
  hasNewControlFlow: boolean;
  hasSignals: boolean;
  name: string;
}

let cachedVersion: AngularVersion | null = null;
let cachedProjectPath: string | null = null;

export function detectAngularVersion(projectPath: string): AngularVersion {
  // Cache results for same project path
  if (cachedProjectPath === projectPath && cachedVersion) {
    return cachedVersion;
  }
  
  const packageJsonPath = path.join(projectPath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    cachedVersion = {
      major: 0,
      minor: 0,
      patch: 0,
      isStandaloneByDefault: false,
      hasNewControlFlow: false,
      hasSignals: false,
      name: 'Unknown'
    };
    cachedProjectPath = projectPath;
    return cachedVersion;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const ngVersion = packageJson.dependencies?.['@angular/core'] || 
                      packageJson.devDependencies?.['@angular/core'];
    
    if (!ngVersion) {
      cachedVersion = {
        major: 0,
        minor: 0,
        patch: 0,
        isStandaloneByDefault: false,
        hasNewControlFlow: false,
        hasSignals: false,
        name: 'Unknown'
      };
      cachedProjectPath = projectPath;
      return cachedVersion;
    }
    
    // Parse version (handle ^, ~, etc.)
    const versionMatch = ngVersion.match(/(\d+)\.(\d+)\.(\d+)/);
    if (!versionMatch) {
      cachedVersion = {
        major: 0,
        minor: 0,
        patch: 0,
        isStandaloneByDefault: false,
        hasNewControlFlow: false,
        hasSignals: false,
        name: 'Unknown'
      };
      cachedProjectPath = projectPath;
      return cachedVersion;
    }
    
    const major = parseInt(versionMatch[1]);
    const minor = parseInt(versionMatch[2]);
    const patch = parseInt(versionMatch[3]);
    
    // Feature availability by version
    const isStandaloneByDefault = major >= 17;
    const hasNewControlFlow = major >= 17;
    const hasSignals = major >= 16;
    
    let name = '';
    if (major <= 15) name = 'Legacy (NgModule required)';
    else if (major === 16) name = 'Transition (Standalone optional)';
    else if (major === 17) name = 'Modern (New control flow)';
    else if (major >= 18) name = 'Latest (Signals + Zoneless)';
    
    const version: AngularVersion = {
      major,
      minor,
      patch,
      isStandaloneByDefault,
      hasNewControlFlow,
      hasSignals,
      name
    };
    
    cachedVersion = version;
    cachedProjectPath = projectPath;
    return version;
  } catch (error) {
    cachedVersion = {
      major: 0,
      minor: 0,
      patch: 0,
      isStandaloneByDefault: false,
      hasNewControlFlow: false,
      hasSignals: false,
      name: 'Error reading version'
    };
    cachedProjectPath = projectPath;
    return cachedVersion;
  }
}

export function findProjectRoot(filePath: string): string {
  let currentDir = path.dirname(filePath);
  while (currentDir !== path.parse(currentDir).root) {
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  return process.cwd();
}

export function resetVersionCache(): void {
  cachedVersion = null;
  cachedProjectPath = null;
}