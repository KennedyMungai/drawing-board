import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Editor } from "@/features/editor/types";
import { MinimizeIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";

type Props = {
  editor: Editor;
};

const Footer = ({ editor }: Props) => {
  return (
    <footer className="z-[49] flex h-[52px] w-full shrink-0 flex-row-reverse items-center gap-x-1 overflow-x-auto border-t bg-white p-2 px-4">
      <Hint label="Reset Zoom" side="top" sideOffset={10}>
        <Button size="icon" variant={"ghost"} onClick={() => editor.autoZoom()}>
          <MinimizeIcon className="size-5" />
        </Button>
      </Hint>
      <Hint label="Zoom In" side="top" sideOffset={10}>
        <Button size="icon" variant={"ghost"} onClick={() => editor.zoomIn()}>
          <ZoomInIcon className="size-5" />
        </Button>
      </Hint>
      <Hint label="Zoom In" side="top" sideOffset={10}>
        <Button size="icon" variant={"ghost"} onClick={() => editor.zoomOut()}>
          <ZoomOutIcon className="size-5" />
        </Button>
      </Hint>
    </footer>
  );
};

export default Footer;
