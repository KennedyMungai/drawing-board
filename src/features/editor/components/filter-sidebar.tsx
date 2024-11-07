import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor, filters } from "@/features/editor/types";
import { cn } from "@/lib/utils";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

const FilterSidebar = ({ activeTool, editor, onChangeActiveTool }: Props) => {
  const onClose = () => onChangeActiveTool("select");

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "filter" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Filters"
        description="Apply a filter to a selected image"
      />
      <ScrollArea>
        <div className="space-y-1 border-b p-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={"secondary"}
              size="lg"
              className={"h-16 w-full justify-start text-left"}
              onClick={() => editor?.changeImageFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FilterSidebar;
