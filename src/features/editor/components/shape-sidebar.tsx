import { ActiveTool } from "@/features/editor/types";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const ShapeSidebar = ({ activeTool, onChangeActiveTool }: Props) => {
  return <div>ShapeSidebar</div>;
};

export default ShapeSidebar;
