import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { FormEvent, useState } from "react";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

const AiSidebar = ({ activeTool, editor, onChangeActiveTool }: Props) => {
  const onClose = () => onChangeActiveTool("select");

  const [value, setValue] = useState("");

  const { mutateAsync, isPending } = useGenerateImage();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Block with paywall

    mutateAsync({ json: { prompt: "" } }).then(() => {
      setValue("");

      editor?.addImage(
        "https://utfs.io/f/IXChAmYW3Hk9FbF4htGr5VK2c8avmXHDwpNhR4ux0MjiZ7TQ",
      );
    });
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "ai" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />
      <ScrollArea>
        <form className="space-y-4 p-4" onSubmit={onSubmit}>
          <Textarea
            cols={30}
            rows={10}
            placeholder="Describe your image"
            required
            minLength={3}
            value={value}
            onChange={(editor) => setValue(editor.target.value)}
            disabled={isPending}
          />
          <Button className="w-full" type="submit" disabled={isPending}>
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default AiSidebar;
