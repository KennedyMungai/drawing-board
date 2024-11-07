import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "@/features/editor/components/color-picker";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor, STROKE_COLOR } from "@/features/editor/types";
import { cn } from "@/lib/utils";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

const DrawSidebar = ({ activeTool, editor, onChangeActiveTool }: Props) => {
  const onClose = () => onChangeActiveTool("select");

  const onChange = (value: string) => editor?.changeStrokeColor(value);

  const value = editor?.strokeColor ?? STROKE_COLOR;

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "draw" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Drawing Mode"
        description="Modify brush settings"
      />
      <ScrollArea>
        <div className="space-y-6 p-4">
          <ColorPicker onChange={onChange} value={value} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default DrawSidebar;
