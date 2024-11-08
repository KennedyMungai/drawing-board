import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor } from "@/features/editor/types";
import { useGetImages } from "@/features/images/api/use-get-images";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { LoaderIcon, TriangleAlertIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

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
      <div className="border-b p-4">
        <UploadButton
          endpoint={"imageUploader"}
          onUploadProgress={() => toast.loading("Uploading image...")}
          onClientUploadComplete={(res) => {
            editor?.addImage(res[0].url);
            toast.dismiss();

            toast.success("Image uploaded");
          }}
          onUploadError={(error: Error) => {
            toast.error(`Failed to upload image: ${error.message}`);
          }}
          appearance={{
            button: "w-full text-sm font-medium",
            allowedContent: "hidden",
          }}
          content={{
            button: "Upload Image",
          }}
        />
      </div>
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
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {imageData?.data &&
              imageData?.data.map((image) => {
                return (
                  <button
                    key={image.id}
                    onClick={() => editor?.addImage(image.urls.regular)}
                    className="group relative h-[100px] w-full overflow-hidden rounded-sm border bg-muted transition hover:opacity-75"
                  >
                    <Image
                      src={image.urls.small}
                      fill
                      sizes="(100vw, 100vh)"
                      alt={image.alt_description ?? "Image"}
                      className="object-cover"
                    />
                    <Link
                      href={image.links.html}
                      target="_blank"
                      className="absolute bottom-0 left-0 z-10 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 transition hover:underline group-hover:opacity-100"
                    >
                      {image.user.name}
                    </Link>
                  </button>
                );
              })}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default ImageSidebar;
