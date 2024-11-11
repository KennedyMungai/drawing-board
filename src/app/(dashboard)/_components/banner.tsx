"use client";

import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Banner = () => {
  const { mutate: createProject, isPending: projectCreationPending } =
    useCreateProject();

  const router = useRouter();

  const onClick = () =>
    createProject(
      {
        json: {
          name: "Untitled Project",
          json: "",
          width: 900,
          height: 1200,
        },
      },
      {
        onSuccess: ({ data }) => router.push(`/editor/${data.id}`),
      },
    );

  return (
    <div className="flex aspect-[5/1] min-h-[248px] items-center gap-x-6 rounded-xl bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#3faff5] p-6 text-white">
      <div className="hidden size-28 items-center justify-center rounded-full bg-white/50 lg:flex">
        <div className="flex size-20 items-center justify-center rounded-full bg-white">
          <SparklesIcon className="h-20 fill-[#0073ff] text-[#0073ff]" />
        </div>
      </div>
      <div className="flex h-1 flex-col justify-center gap-y-2">
        <h1 className="text-xl font-semibold lg:text-3xl">
          Visualize your ideas with Image AI
        </h1>
        <p className="mb-2 text-xs lg:text-sm">
          Turn inspiration into design in no time.Simply upload an image and let
          AI do the rest.
        </p>
        <Button
          variant={"secondary"}
          className="w-[160px]"
          onClick={onClick}
          disabled={projectCreationPending}
        >
          Start Creating <ArrowRightIcon className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Banner;
