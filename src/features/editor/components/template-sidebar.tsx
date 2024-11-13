import { TemplateType } from "@/app/(dashboard)/_components/templates-section";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor } from "@/features/editor/types";
import { useGetTemplates } from "@/features/projects/api/use-get-templates";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import useConfirm from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { CrownIcon, LoaderIcon, TriangleAlertIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const TemplateSidebar = ({ activeTool, editor, onChangeActiveTool }: Props) => {
  const { shouldBlock, triggerPaywall } = usePaywall();

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Load template",
    message: "You are about to replace the current project with the template",
  });

  const {
    data: templateData,
    isLoading: isLoadingTemplateData,
    isError: isErrorTemplateData,
  } = useGetTemplates({ limit: "20", page: "1" });

  const onClose = () => onChangeActiveTool("select");

  const onClick = async (template: TemplateType) => {
    if (template.isPro && shouldBlock) {
      triggerPaywall();

      return;
    }

    const ok = await confirm();

    if (ok) editor?.loadJson(template.json);
  };

  return (
    <>
      <aside
        className={cn(
          "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
          activeTool === "templates" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Templates"
          description="Choose from a variety of templates to get started"
        />
        {isLoadingTemplateData && (
          <div className="flex flex-1 items-center justify-center">
            <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}
        {isErrorTemplateData && (
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
              {templateData?.data &&
                templateData?.data.map((template) => {
                  return (
                    <button
                      key={template.id}
                      onClick={() => onClick(template)}
                      style={{
                        aspectRatio: `${template.width}/${template.height}`,
                      }}
                      className="group relative h-[100px] w-full overflow-hidden rounded-sm border bg-muted transition hover:opacity-75"
                    >
                      <Image
                        src={template.thumbnailUrl ?? ""}
                        fill
                        sizes="(100vw, 100vh)"
                        alt={template.name}
                        className="object-cover"
                      />
                      {template.isPro && (
                        <div className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-full bg-black/50">
                          <CrownIcon className="size-4 fill-yellow-500 text-yellow-500" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 z-10 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                        {template.name}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </ScrollArea>
        <ToolSidebarClose onClick={onClose} />
      </aside>
      <ConfirmDialog />
    </>
  );
};

export default TemplateSidebar;
