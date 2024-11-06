import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor } from "@/features/editor/types";
import { useGetImages } from "@/features/images/api/use-get-images";
import { cn } from "@/lib/utils";
import { LoaderIcon, TriangleAlertIcon } from "lucide-react";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

const ImageSidebar = ({ activeTool, editor, onChangeActiveTool }: Props) => {
  const {
    data: imageData,
    isLoading: isLoadingImageData,
    isError: isErrorImages,
  } = useGetImages();

  const onClose = () => onChangeActiveTool("select");

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "images" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add images to your canvas"
      />
      {isLoadingImageData && (
        <div className="flex flex-1 items-center justify-center">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}
      {isErrorImages && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <TriangleAlertIcon className="size-5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Failed to fetch images
          </p>
        </div>
      )}
      <ScrollArea>
        <div className="space-y-1 border-b p-4"></div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default ImageSidebar;
