import { RGBColor } from "react-color";
import { fabric } from "fabric";

export const isTextType = (type: string | undefined) =>
  type === "text" || type === "i-text" || type === "textbox";

export const rgbaObjectToString = (rgba: RGBColor | "transparent") => {
  if (rgba === "transparent") return "rgba(0,0,0,0)";

  const alpha = rgba.a === undefined ? 1 : rgba.a;

  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
};

export const createFilter = (value: string) => {
  let effect;

  switch (value) {
    case "grayscale":
      effect = new fabric.Image.filters.Grayscale();
      break;
    case "polaroid":
      // @ts-expect-error Polaroid has no type definitions
      effect = new fabric.Image.filters.Polaroid({ angle: 45 });
      break;
    case "sepia":
      effect = new fabric.Image.filters.Sepia();
      break;
    case "kodachrome":
      // @ts-expect-error Kodachrome has no type definitions
      effect = new fabric.Image.filters.Kodachrome();
      break;
    case "contrast":
      effect = new fabric.Image.filters.Contrast({ contrast: 0.3 });
      break;
    case "brightness":
      effect = new fabric.Image.filters.Brightness({ brightness: 0.8 });
      break;
    case "brownie":
      // @ts-expect-error Brownie has no type definitions
      effect = new fabric.Image.filters.Brownie();
      break;
    case "vintage":
      // @ts-expect-error Vintage has no type definitions
      effect = new fabric.Image.filters.Vintage();
      break;
    case "technicolor":
      // @ts-expect-error Technicolor has no type definitions
      effect = new fabric.Image.filters.Technicolor();
      break;
    case "pixelate":
      effect = new fabric.Image.filters.Pixelate();
      break;
    case "invert":
      effect = new fabric.Image.filters.Invert();
      break;
    case "blur":
      effect = new fabric.Image.filters.Blur();
      break;
    case "sharpen":
      effect = new fabric.Image.filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      });
      break;
    case "emboss":
      effect = new fabric.Image.filters.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
      });
      break;
    case "removeColor":
      // @ts-expect-error RemoveColor has no type definitions
      effect = new fabric.Image.filters.RemoveColor({
        threshold: 0.2,
        distance: 0.5,
      });
      break;
    case "blacknwhite":
      // @ts-expect-error BlackWhite has no type definitions
      effect = new fabric.Image.filters.BlackWhite();
      break;
    case "vibrance":
      // @ts-expect-error Vibrance has no type definitions
      effect = new fabric.Image.filters.Vibrance({ vibrance: 1 });
      break;
    case "blendcolor":
      effect = new fabric.Image.filters.BlendColor({
        color: "#0f0",
        mode: "multiply",
      });
      break;
    case "huerotate":
      effect = new fabric.Image.filters.HueRotation({
        rotation: 0.5,
      });
      break;
    case "resize":
      effect = new fabric.Image.filters.Resize();
      break;
    case "gamma":
      // @ts-expect-error Gamma has no type definitions
      effect = new fabric.Image.filters.Gamma({
        gamma: [1, 0.5, 2.1],
      });
      break;
    case "saturation":
      effect = new fabric.Image.filters.Saturation({ saturation: 0.5 });
      break;
    default:
      effect = null;
      return;
  }

  return effect;
};