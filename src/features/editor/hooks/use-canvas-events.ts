import { fabric } from "fabric";
import { useEffect } from "react";

type Props = {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
};

export const useCanvasEvents = ({
  save,
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: Props) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);

        clearSelectionCallback?.();
      });

      canvas.on("object:added", () => save());
      canvas.on("object:removed", () => save());
      canvas.on("object:modified", () => save());
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
        canvas.off("object:added");
        canvas.off("object:removed");
        canvas.off("object:modified");
      }
    };

    // There is no need to put setSelectedObjects in the dependency array as it is a local state dispatcher
  }, [canvas, setSelectedObjects, clearSelectionCallback, save]);
};
