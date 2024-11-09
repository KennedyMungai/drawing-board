import { protectServer } from "@/features/auth/utils";
import Editor from "@/features/editor/components/editor";

type Props = {
  params: {
    projectId: string;
  };
};

const ProjectPage = async ({ params }: Props) => {
  await protectServer();

  return <Editor />;
};

export default ProjectPage;
