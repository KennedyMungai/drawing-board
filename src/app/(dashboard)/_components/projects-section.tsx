"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { formatDistanceToNow } from "date-fns";
import {
  CopyIcon,
  FileIcon,
  LoaderIcon,
  MoreVerticalIcon,
  SearchIcon,
  TrashIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const ProjectsSection = () => {
  const router = useRouter();

  const {
    data,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isPending,
  } = useGetProjects();

  if (status === "error") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Projects</h3>
        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <TriangleAlertIcon className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Failed to load projects
          </p>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Projects</h3>
        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!data.pages.length) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Projects</h3>
        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <SearchIcon className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No Projects Found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Projects</h3>
      <Table>
        <TableBody>
          {data.pages.map((group, index) => (
            <Fragment key={index}>
              {group.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell
                    className="flex cursor-pointer items-center gap-x-2 font-medium"
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    <FileIcon className="size-6" />
                    {project.name}
                  </TableCell>
                  <TableCell className="hidden cursor-pointer md:table-cell">
                    {project.width} x {project.height} px
                  </TableCell>
                  <TableCell className="hidden cursor-pointer md:table-cell">
                    {formatDistanceToNow(
                      new Date(
                        project.updatedAt
                          ? project.updatedAt
                          : project.createdAt,
                      ),
                      {
                        addSuffix: true,
                      },
                    )}
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={false}>
                          <MoreVerticalIcon className="size-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-60">
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={false}
                          onClick={() => {}}
                        >
                          <CopyIcon className="mr-2 size-5" />
                          Make a copy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={false}
                          onClick={() => {}}
                        >
                          <TrashIcon className="mr-2 size-5" />
                          Delete Item
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsSection;
