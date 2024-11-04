import { ChevronsLeftIcon } from "lucide-react";

type Props = {
  onClick: () => void;
};

const ToolSidebarClose = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="group/toolbar-close absolute -right-[1.80rem] top-1/2 flex h-[70px] -translate-y-1/2 transform items-center justify-center rounded-r-xl border-y border-r bg-white px-1 pr-2"
    >
      <ChevronsLeftIcon className="size-4 text-black transition group-hover/toolbar-close:opacity-75" />
    </button>
  );
};

export default ToolSidebarClose;
