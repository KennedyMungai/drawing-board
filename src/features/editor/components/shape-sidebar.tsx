import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "@/features/editor/components/shape-tool";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { IoTriangle } from "react-icons/io5";
import ToolSidebarClose from "./tool-sidebar-close";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

const ShapeSidebar = ({ activeTool, onChangeActiveTool, editor }: Props) => {
  const onClose = () => onChangeActiveTool("select");

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
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool onClick={() => editor?.addCircle()} icon={FaCircle} />
          <ShapeTool onClick={() => {}} icon={FaSquare} />
          <ShapeTool onClick={() => {}} icon={FaSquareFull} />
          <ShapeTool onClick={() => {}} icon={IoTriangle} />
          <ShapeTool
            onClick={() => {}}
            icon={IoTriangle}
            iconClassName="rotate-180"
          />
          <ShapeTool onClick={() => {}} icon={FaDiamond} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default ShapeSidebar;