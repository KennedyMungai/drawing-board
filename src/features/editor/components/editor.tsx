"use client";

import { useEditor } from "@/features/editor/hooks/use-editor";
import { useEffect } from "react";

const Editor = () => {
  const { init } = useEditor();

  useEffect(() => {
    init();
  }, []);

  return <div>Editor</div>;
};

export default Editor;
