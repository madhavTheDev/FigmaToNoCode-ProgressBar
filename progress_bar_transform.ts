import { FigmaDocumentNode, RGBAColor } from "./types";

interface ProgressBarSize {
  "0": string;
  "1": string;
  isDirty: boolean;
  value: string;
}
interface ProgressBarBlock {
  dpOn: any[];
  displayName: string;
  dataSourceIds: any[];
  id: string;
  parentId: string;
  visibility: {
    value: boolean;
  };
  component: {
    componentType: "ProgressBar";
    slots: {};
    appearance: {
      color: string;
      labelPosition: string;
      showValueMarker: boolean;
      trackColor: string;
      hideLabel: boolean;
      label: {
        color: string;
        variant: string;
        weight: string;
      };
      value: {
        color: string;
        variant: string;
        weight: string;
      };
      styles: {
        margin: {
          all: string;
        };
        rotation: {
          custom: string;
        };
        width: {
          custom: string;
        };
        height: {
          custom: string;
        };
      };
      size: ProgressBarSize;
    };
    content: {
      min: number;
      max: number;
      decimalPlaces: number;
      notation: string;
      progress: number;
      type: string;
    };
  };
}

/**
 * Converts RGB color object to CSS variable or hex string
 */
function rgbaToColor(color: RGBAColor): string {
  // Convert to 0-255 range
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);

  // Return hex color
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/**
 * Extracts progress percentage from component properties or text
 */
function extractProgress(node: FigmaDocumentNode): number {
  // Check component properties first
  if (node.componentProperties?.Progress?.value) {
    const progressStr = node.componentProperties.Progress.value;
    const percentValue = Number(progressStr);

    return percentValue;
  }

  return 50; // Default fallback
}

/**
 * Determines size value based on height (thickness)
 */
function determineSize(thickness: number): ProgressBarSize {
  return {
    "0": "m",
    "1": "d",
    isDirty: true,
    value: getAliasForBarThickness(thickness),
  };
}

/**
 * Determines label position based on layout
 */
function determineLabelPosition(node: FigmaDocumentNode): string {
  if (!node.layoutMode || node.layoutMode === "HORIZONTAL") {
    return "right";
  }
  return "bottom";
}

/**
 * Generates a unique ID for the component
 */
function generateId(): string {
  return `b_${Math.random().toString(16).slice(2, 7)}`;
}

/**
 * get alias for thickness of bar
 */
function getAliasForBarThickness(thickness: number): string {
  /**
   * 4px xs
   * 6px sm
   * 8px md
   * 12px lg
   * 16px xl
   */
  switch(thickness){
    case 4 : return 'xs';
    case 6 : return 'sm';
    case 8 : return 'md';
    case 12 : return 'lg';
    case 16 : return 'xl';
    default : return 'md'; // Figma mostly has 8px
  }
}

/**
 * Transforms a FigmaDocumentNode into a ProgressBar Block
 */
export function transform(node: FigmaDocumentNode): ProgressBarBlock {
  const progress = extractProgress(node);

  // Get thickness from the progress bar container or the node itself
  let thickness: number = node.children?.[0].absoluteBoundingBox?.height ?? 8;

  let containerWidth: number = node.absoluteBoundingBox?.width ?? 131;
  let containerHeight: number = node.absoluteBoundingBox?.height ?? 36;

  // TODO Find progress bar colors
  let progressColor = "var(--palette-brand-600)";
  let trackColor = "var(--palette-gray-100)";
  // PATH rgbaToColor(node.children[0]) -> node.children[0] returns an array which contains two children, first one would give the trackColor and second child would give the color (i.e., progressColor)

  return {
    dpOn: [],
    displayName: "ProgressBar",
    dataSourceIds: [],
    id: generateId(),
    parentId: "root_id",
    visibility: {
      value: node.visible ?? true,
    },
    component: {
      componentType: "ProgressBar",
      slots: {},
      content: {
        min: 0,
        max: 100,
        decimalPlaces: 0,
        notation: "standard",
        progress: progress,
        type: "Bar",
      },
      appearance: {
        color: progressColor,
        labelPosition: determineLabelPosition(node),
        showValueMarker: false,
        trackColor: trackColor,
        hideLabel: false,
        size: determineSize(thickness),
        label: {
          color: "text-tertiary",
          variant: "text-xs",
          weight: "medium",
        },
        value: {
          color: "text-primary",
          variant: "display-sm",
          weight: "semi-bold",
        },
        styles: {
          margin: {
            all: "m-lg",
          },
          rotation: {
            custom: "0deg",
          },
          width: {
            custom: `${containerWidth}px`,
          },
          height: {
            custom: `${containerHeight}px`,
          },
        },
      },
    },
  };
}
