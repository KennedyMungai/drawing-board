"use client";

import { readProjectSchema } from "@/db/schema";
import AiSidebar from "@/features/editor/components/ai-sidebar";
import DrawSidebar from "@/features/editor/components/draw-sidebar";
import FillColorSidebar from "@/features/editor/components/fill-color-sidebar";
import FilterSidebar from "@/features/editor/components/filter-sidebar";
import FontSidebar from "@/features/editor/components/font-sidebar";
import Footer from "@/features/editor/components/footer";
import ImageSidebar from "@/features/editor/components/image-sidebar";
import Navbar from "@/features/editor/components/navbar";
import OpacitySidebar from "@/features/editor/components/opacity-sidebar";
import SettingsSidebar from "@/features/editor/components/settings-sidebar";
import ShapeSidebar from "@/features/editor/components/shape-sidebar";
import Sidebar from "@/features/editor/components/sidebar";
import StrokeColorSidebar from "@/features/editor/components/stroke-color-sidebar";
import StrokeWidthSidebar from "@/features/editor/components/stroke-width-sidebar";
import TextSidebar from "@/features/editor/components/text-sidebar";
import Toolbar from "@/features/editor/components/toolbar";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { ActiveTool, selectionDependentTools } from "@/features/editor/types";
import { useUpdateProject } from "@/features/projects/api/use-update-project";
import { fabric } from "fabric";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";

type Props = {
  initialData: z.input<typeof readProjectSchema>;
};

const Editor = ({ initialData }: Props) => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const { mutate: updateProject } = useUpdateProject(initialData.id);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((values: { json: string; height: number; width: number }) => {
      updateProject({ param: { projectId: initialData.id }, json: values });
    }, 500),
    [updateProject, initialData.id],
  );

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    defaultState: initialData.json,
    defaultWidth: initialData.width,
    defaultHeight: initialData.height,
    clearSelectionCallback: onClearSelection,
    saveCallback: debouncedSave,
  });
  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === "draw") editor?.enableDrawingMode();

      if (activeTool === "draw") editor?.disableDrawingMode();

      if (tool === activeTool) return setActiveTool("select");

      setActiveTool(tool);
    },
    [activeTool, editor],
  );

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="flex h-full flex-col">
      <Navbar
        id={initialData.id}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
        editor={editor}
      />
      <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ImageSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FilterSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <AiSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <DrawSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <SettingsSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        {/* <TemplateSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        /> */}
        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas?.getActiveObject())}
          />
          <div
            ref={containerRef}
            className="h-[calc(100%-124px)] flex-1 bg-muted"
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer editor={editor} />
        </main>
      </div>
    </div>
  );
};

export default Editor;
