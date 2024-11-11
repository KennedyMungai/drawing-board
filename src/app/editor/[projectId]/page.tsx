"use client";

import { Button } from "@/components/ui/button";
import Editor from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { LoaderIcon, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProjectPage = () => {
  const pathname = usePathname();

  const projectId = pathname.split("/")[2];

  const {
    data: projectData,
    isPending: isProjectLoading,
    isError: isProjectError,
  } = useGetProject(projectId);

  if (isProjectLoading || !projectData) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isProjectError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <TriangleAlertIcon className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Failed to fetch project
        </span>
        <Button variant={"secondary"} asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const {} = projectData.data;

  return (
    <Editor
      initialData={{
        ...projectData.data,
        createdAt: new Date(projectData.data.createdAt),
        updatedAt: projectData.data.updatedAt
          ? new Date(projectData.data.updatedAt)
          : null,
      }}
    />
  );
};

export default ProjectPage;
