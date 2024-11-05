import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import {
  ActiveTool,
  Editor,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "@/features/editor/types";
import { cn } from "@/lib/utils";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

const StrokeWidthSidebar = ({
  activeTool,
  editor,
  onChangeActiveTool,
}: Props) => {
  const onClose = () => onChangeActiveTool("select");

  const onChangeStrokeWidth = (value: number) =>
    editor?.changeStrokeWidth(value);

  const onChangeStrokeType = (value: number[]) =>
    editor?.changeStrokeDashArray(value);

  const widthValue = editor?.strokeWidth ?? STROKE_WIDTH;

  const typeValue = editor?.strokeDashArray ?? STROKE_DASH_ARRAY;

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "stroke-width" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Stroke Options"
        description="Modify the stroke of your object"
      />
      <ScrollArea>
        <div className="space-y-6 border-b p-4">
          <Label className="text-sm">Stroke Width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(value) => onChangeStrokeWidth(value[0])}
          />
        </div>
        <div className="space-y-6 border-b p-4">
          <Label className="text-sm">Stroke Type</Label>
          <Button
            size="lg"
            variant={"secondary"}
            className={cn(
              "h-16 w-full justify-start px-2 py-4 text-left",
              JSON.stringify(typeValue) === "[]" && "border-2 border-blue-500",
            )}
            onClick={() => onChangeStrokeType([])}
          >
            <div className="w-full rounded-full border-4 border-black" />
          </Button>
          <Button
            size="lg"
            variant={"secondary"}
            className={cn(
              "h-16 w-full justify-start px-2 py-4 text-left",
              JSON.stringify(typeValue) === "[5,5]" &&
                "border-2 border-blue-500",
            )}
            onClick={() => onChangeStrokeType([5, 5])}
          >
            <div className="w-full rounded-full border-4 border-dashed border-black" />
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default StrokeWidthSidebar;
