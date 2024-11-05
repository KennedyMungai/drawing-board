import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "@/features/editor/components/color-picker";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor, FILL_COLOR } from "@/features/editor/types";
import { cn } from "@/lib/utils";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

const FillColorSidebar = ({
  activeTool,
  editor,
  onChangeActiveTool,
}: Props) => {
  const onClose = () => onChangeActiveTool("select");

  const onChange = (value: string) => editor?.changeFillColor(value);

  const value = editor?.fillColor ?? FILL_COLOR;

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "fill" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Fill Color"
        description="Add fill color to your element"
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

export default FillColorSidebar;
