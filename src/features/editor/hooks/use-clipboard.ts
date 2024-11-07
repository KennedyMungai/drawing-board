import { fabric } from "fabric";
import { useCallback, useRef } from "react";

type Props = {
  canvas: fabric.Canvas | null;
};

export const useClipboard = ({ canvas }: Props) => {
  const clipboard = useRef<unknown>(null);

  const copy = useCallback(() => {
    canvas?.getActiveObject()?.clone((cloned: unknown) => {
      clipboard.current = cloned;
    });
  }, [canvas]);

  const paste = useCallback(() => {
    if (!clipboard.current) return;

    // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
    clipboard.current.clone((clonedObj: unknown) => {
      canvas?.discardActiveObject();

      // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
      clonedObj.set({
        // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
        left: clonedObj.left + 10,
        // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
        top: clonedObj.top + 10,
        evented: true,
      });

      // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
      if (clonedObj.type === "activeSelection") {
        // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
        clonedObj.canvas = canvas;

        // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
        clonedObj.forEachObject((obj: unknown) => {
          // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
          canvas?.add(obj);
        });

        // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
        clonedObj.setCoords();
      } else {
        // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
        canvas?.add(clonedObj);
      }

      // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
      clipboard.current.top += 10;
      // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
      clipboard.current.left += 10;

      // @ts-expect-error Type 'unknown' is not assignable to type 'fabric.Object'.
      canvas?.setActiveObject(clonedObj);

      canvas?.requestRenderAll();
    });
  }, [canvas]);

  return { copy, paste };
};
