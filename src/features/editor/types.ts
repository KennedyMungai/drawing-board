import { fabric } from "fabric";

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
};

export type Editor = {
  addCircle: () => void;
  addSoftRectangle: () => void;
};

export const FILL_COLOR = "rgba(0,0,0,1)";

export const STROKE_COLOR = "rgba(0,0,0,1)";

export const STROKE_WIDTH = 2;

export const CIRCLE_OPTIONS = {
  radius: 150,
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