import { protectServer } from "@/features/auth/utils";
import Editor from "@/features/editor/components/editor";

type Props = {
  params: {
    projectId: string;
  };
};

const ProjectPage = async ({ params }: Props) => {
  await protectServer();

  const { projectId } = await params;

  return <Editor projectId={projectId} />;
};

export default ProjectPage;
