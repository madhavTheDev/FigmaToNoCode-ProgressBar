// import type { FigmaBackgroundFill } from './css/background';

// export type * from './css/background';

interface AbsoluteBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BoundVariables {
  paddingTop?: {
    id: string;
  };
  paddingRight?: {
    id: string;
  };
  paddingBottom?: {
    id: string;
  };
  paddingLeft?: {
    id: string;
  };
  itemSpacing?: {
    id: string;
  };
}

type AxisAlignItems = 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN' | 'SPACE_AROUND';

export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type FigmaDocumentNode = {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  componentId?: string;
  characters?: string;
  layoutSizingHorizontal?: 'FIXED' | 'FILL' | 'HUG';
  layoutSizingVertical?: 'FIXED' | 'FILL' | 'HUG';
  layoutMode?: 'HORIZONTAL' | 'VERTICAL';
  style?: {
    fontWeight?: number;
    fontSize?: number;
  };
  absoluteBoundingBox?: AbsoluteBounds;
  absoluteRenderBounds?: AbsoluteBounds;
  boundVariables?: BoundVariables;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  fills?: {
    type: 'SOLID' | 'GRADIENT';
    color: RGBAColor;
  }[];
  componentProperties?: {
    Progress?: {
      value: string;
      type: string;
      boundVariables: {};
    };
    Size?: {
      value: string;
    };
    Hierarchy?: {
      value: string;
    };
    Color?: {
      value: string;
    };
    Type?: {
      value: string;
    };
    Icon?: {
      value: string;
    };
  };
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  layoutGrow?: number;
  layoutWrap?: 'NO_WRAP' | 'WRAP';
  layoutAlign?: 'INHERIT' | 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
  primaryAxisAlignItems?: AxisAlignItems;
  counterAxisAlignItems?: AxisAlignItems;
  primaryAxisSizingMode?: 'AUTO' | 'FIXED';
  counterAxisSizingMode?: 'AUTO' | 'FIXED';
  primaryAxisSpacing?: number;
  itemSpacing?: number;
  counterAxisSpacing?: number;
  strokes?: {
    color: RGBAColor;
  }[];
  strokeWeight?: number;
  individualStrokeWeights?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  cornerRadius?: number;
  rectangleCornerRadii?: number[];
  // background?: FigmaBackgroundFill[];
  backgroundColor?: RGBAColor;
  children?: FigmaDocumentNode[];
};

export type FigmaComponentNode = {
  key: string;
  name: string;
};

export type FigmaStyleNode = {
  key: string;
  name: string;
  styleType: string;
};

export type Frame = {
  document: FigmaDocumentNode;
  components: Record<string, FigmaComponentNode | undefined>;
  styles: Record<string, FigmaStyleNode | undefined>;
};
