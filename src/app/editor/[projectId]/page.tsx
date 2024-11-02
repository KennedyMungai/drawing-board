import Editor from "@/features/editor/components/editor";

type Props = {
  params: {
    projectId: string;
  };
};

const ProjectPage = async ({ params }: Props) => {
  const { projectId } = await params;

  return <Editor />;
};

export default ProjectPage;
