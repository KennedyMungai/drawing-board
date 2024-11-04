import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const ShapeSidebar = ({ activeTool, onChangeActiveTool }: Props) => {
  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "shapes" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      Shapes Sidebar
    </aside>
  );
};

export default ShapeSidebar;
