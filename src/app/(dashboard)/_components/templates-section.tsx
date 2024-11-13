"use client";

import TemplateCard from "@/app/(dashboard)/_components/template-card";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { useGetTemplates } from "@/features/projects/api/use-get-templates";
import { LoaderIcon, TriangleAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type TemplateType = {
  json: string;
  id: string;
  name: string;
  userId: string;
  height: number;
  width: number;
  thumbnailUrl: string | null;
  isTemplate: boolean;
  isPro: boolean;
  createdAt: string;
  updatedAt: string | null;
};

const TemplatesSection = () => {
  const router = useRouter();

  const {
    data: templates,
    isLoading: isLoadingTemplates,
    isError: isTemplatesError,
    error: templatesError,
  } = useGetTemplates({
    page: "1",
    limit: "4",
  });

  const { mutate: createProject, isPending: isCreatingProject } =
    useCreateProject();

  if (isLoadingTemplates) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Start from a template</h3>
        <div className="flex h-32 items-center justify-center">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (isTemplatesError) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Start from a template</h3>
        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <TriangleAlertIcon className="size-5 text-muted-foreground" />
          <p>{templatesError.message}</p>
        </div>
      </div>
    );
  }

  if (templates?.data.length === 0) {
    return null;
  }

  const onClick = (template: TemplateType) => {
    createProject(
      {
        json: {
          name: `${template.name} project`,
          json: template.json,
          width: template.width,
          height: template.height,
        },
      },
      {
        onSuccess: ({ data }) => router.push(`/editor/${data.id}`),
      },
    );
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Start from a template</h3>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {templates?.data.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.name}
            imageSrc={template.thumbnailUrl ?? ""}
            description={`${template.width} x ${template.height}`}
            width={template.width}
            height={template.height}
            isPro={template.isPro}
            onClick={() => onClick(template)}
            disabled={isCreatingProject}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplatesSection;
