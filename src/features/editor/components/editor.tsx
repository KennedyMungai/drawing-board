"use client";

import Navbar from "@/features/editor/components/navbar";
import Sidebar from "@/features/editor/components/sidebar";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { fabric } from "fabric";
import { useEffect, useRef } from "react";

const Editor = () => {
  const { init } = useEditor();

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });
  }, [init]);

  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
        <Sidebar />
        <div ref={containerRef} className="h-full flex-1 bg-muted">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
