import { fabric } from "fabric";
import { useEffect } from "react";

type Props = {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
};

export const useCanvasEvents = ({ canvas, setSelectedObjects }: Props) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selected:created", (e) => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on("selected:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
      });
    }

    // There is no need to put setSelectedObjects in the dependency array as it is a local state dispatcher
  }, [canvas, setSelectedObjects]);
};
