import { SourceFile, SyntaxKind } from 'ts-morph';
import { deductPoints } from '../core/score-engine';

export function checkRendererDeprecations(sourceFile: SourceFile) {
  const text = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  
  // Check for deprecated Renderer (not Renderer2)
  if (text.includes('Renderer') && !text.includes('Renderer2')) {
    deductPoints(
      'RendererDeprecation',
      filePath,
      5,
      'Using deprecated Renderer instead of Renderer2',
      'Replace Renderer with Renderer2 for better security and performance'
    );
  }
  
  // Check for direct DOM manipulation (bad practice)
  const hasDirectDOM = text.includes('document.') || 
                       text.includes('window.') ||
                       text.includes('nativeElement');
  
  if (hasDirectDOM && !text.includes('Renderer2')) {
    deductPoints(
      'DirectDOM',
      filePath,
      4,
      'Direct DOM manipulation detected without Renderer2',
      'Use Renderer2 methods instead of direct DOM access for better security'
    );
  }
}