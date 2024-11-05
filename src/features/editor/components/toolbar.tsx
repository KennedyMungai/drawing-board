"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const Toolbar = ({ activeTool, editor, onChangeActiveTool }: Props) => {
  const selectedObject = editor?.canvas?.getActiveObject();

  const getProperty = (property: unknown) => {
    if (!selectedObject) return null;

    return selectedObject?.get(property);
  };

  const fillColor = getProperty("fill");
  const fillColor2 = editor?.fillColor;

  const [properties, setProperties] = useState({
    fillColor,
  });

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
      <div className="flex h-full items-center justify-center">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("fill")}
            size="icon"
            variant={"ghost"}
            className={cn(activeTool === "fill" && "bg-gray-100")}
          >
            <div
              className="size-4 rounded-sm border"
              style={{
                backgroundColor:
                  typeof fillColor === "string" ? fillColor : "black",
              }}
            />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
