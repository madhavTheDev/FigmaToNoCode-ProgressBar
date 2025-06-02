import { FigmaDocumentNode } from "./types";

/**
 * Identifies if a FigmaDocumentNode represents a Progress Bar component
 */
export function identify(node: FigmaDocumentNode): boolean {
  // Check if it's a component instance or frame with progress bar characteristics
  return String(node?.name).toLowerCase().includes("progress") ?? false;
}