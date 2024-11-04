type Props = {
  title: string;
  description?: string;
};

const ToolSidebarHeader = ({ title, description }: Props) => {
  return (
    <div className="h-[68px] space-y-1 border-b p-4">
      <p className="text-sm font-medium">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default ToolSidebarHeader;
