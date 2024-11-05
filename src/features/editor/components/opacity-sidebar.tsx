import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

const OpacitySidebar = ({ activeTool, editor, onChangeActiveTool }: Props) => {
  const initialValue = editor?.getActiveOpacity() ?? 1;

  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects],
  );

  const [opacity, setOpacity] = useState(initialValue);

  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject]);

  const onClose = () => onChangeActiveTool("select");

  const onChange = (value: number) => {
    editor?.changeOpacity(value);

    setOpacity(value);
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "opacity" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Opacity"
        description="Modify the opacity of the selected object"
      />
      <ScrollArea>
        <div className="space-y-6 border-b p-4">
          <Slider
            value={[opacity]}
            onValueChange={(value) => onChange(value[0])}
            max={1}
            min={0}
            step={0.01}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default OpacitySidebar;
