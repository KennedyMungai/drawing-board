import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const JSON_KEYS = [
  "name",
  "gradientAngle",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extensionType",
  "extension",
];

export const filters = [
  "none",
  "grayscale",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removeColor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "gamma",
  "saturation",
];

export const fonts = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Times New Roman",
  "Tahoma",
  "Trebuchet MS",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
];

export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export type BuildEditorProps = {
  canvas: fabric.Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
  strokeDashArray: number[];
  fontFamily: string;
  copy: () => void;
  paste: () => void;
  autoZoom: () => void;
  canRedo: () => void;
  canUndo: () => void;
  redo: () => void;
  undo: () => void;
  save: (skip?: boolean) => void;
  setFontFamily: (value: string) => void;
  setStrokeDashArray: (value: number[]) => void;
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
};

export type Editor = {
  onCopy: () => void;
  onPaste: () => void;
  onUndo: () => void;
  canUndo: () => void;
  canRedo: () => void;
  onRedo: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  autoZoom: () => void;
  savePng: () => void;
  saveJpg: () => void;
  saveSvg: () => void;
  saveJson: () => void;
  loadJson: (json: string) => void;
  enableDrawingMode: () => void;
  disableDrawingMode: () => void;
  changeImageFilter: (value: string) => void;
  addImage: (value: string) => void;
  delete: () => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  changeStrokeDashArray: (value: number[]) => void;
  bringForward: () => void;
  sendBackwards: () => void;
  getWorkspace: () => fabric.Object | undefined;
  changeOpacity: (value: number) => void;
  changeSize: (value: { width: number; height: number }) => void;
  changeBackground: (value: string) => void;
  getActiveOpacity: () => number;
  getActiveFontFamily: () => string;
  getActiveFontLinethrough: () => boolean;
  getActiveFontUnderline: () => boolean;
  getActiveFontSize: () => number;
  addText: (value: string, options?: ITextboxOptions) => void;
  changeFontFamily: (value: string) => void;
  changeFontWeight: (value: number) => void;
  changeTextAlign: (value: string) => void;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => string;
  getActiveTextAlign: () => string;
  changeFontStyle: (value: string) => void;
  changeFontLinethrough: (value: boolean) => void;
  changeFontUnderline: (value: boolean) => void;
  changeFontSize: (value: number) => void;
  fontFamily: string;
  strokeDashArray: number[];
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
};

export const FILL_COLOR = "rgba(0,0,0,1)";

export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];

export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;

export const CIRCLE_OPTIONS = {
  radius: 225,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  stroke_width: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  stroke_width: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  stroke_width: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  stroke_width: STROKE_WIDTH,
  width: 600,
  height: 600,
  angle: 0,
};

export const TEXT_OPTIONS = {
  type: "textbox",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

export const selectionDependentTools = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];

export type EditorHookProps = {
  defaultState?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  clearSelectionCallback?: () => void;
  saveCallback?: (values: {
    json: string;
    height: number;
    width: number;
  }) => void;
};
