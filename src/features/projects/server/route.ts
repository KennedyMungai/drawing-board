import { db } from "@/db";
import { insertProjectSchema, projects, readProjectSchema } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, asc, desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({ page: z.coerce.number(), limit: z.coerce.number() }),
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { limit, page } = c.req.valid("query");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, auth.token.id as string))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    },
  )
  .get(
    "/:projectId",
    verifyAuth(),
    zValidator("param", z.object({ projectId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { projectId } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, projectId),
            eq(projects.userId, auth.token.id as string),
          ),
        );

      if (!data) return c.json({ error: "Project not found" }, 404);

      return c.json({ data });
    },
  )
  .get(
    "/templates",
    verifyAuth(),
    zValidator(
      "query",
      z.object({ page: z.coerce.number(), limit: z.coerce.number() }),
    ),
    async (c) => {
      const { page, limit } = c.req.valid("query");

      // Not checking if the auth.token.id is null as the verifyAuth middleware is sufficient
      // and the templates being loaded is not user specific
      const [data] = await db
        .select()
        .from(projects)
        .where(eq(projects.isTemplate, true))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(asc(projects.isPro), desc(projects.updatedAt));

      return c.json({ data });
    },
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      insertProjectSchema.pick({
        name: true,
        json: true,
        width: true,
        height: true,
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { height, json, name, width } = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .insert(projects)
        .values({
          name,
          json,
          width,
          height,
          userId: auth.token.id as string,
        })
        .returning();

      if (!data) return c.json({ error: "Something went wrong" }, 400);

      return c.json({ data });
    },
  )
  .post(
    "/:projectId/duplicate",
    verifyAuth(),
    zValidator("param", z.object({ projectId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { projectId } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [projectToCopy] = await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, projectId),
            eq(projects.userId, auth.token.id as string),
          ),
        );

      if (!projectToCopy) return c.json({ error: "Project not found" }, 404);

      const [duplicateProject] = await db
        .insert(projects)
        .values({
          name: `Copy of ${projectToCopy.name}`,
          width: projectToCopy.width,
          height: projectToCopy.height,
          json: projectToCopy.json,
          thumbnailUrl: projectToCopy.thumbnailUrl,
          isTemplate: projectToCopy.isTemplate,
          isPro: projectToCopy.isPro,
          userId: auth.token.id as string,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (!duplicateProject)
        return c.json({ error: "Failed to duplicate project" }, 400);

      return c.json({ data: duplicateProject });
    },
  )
  .patch(
    "/:projectId",
    verifyAuth(),
    zValidator("param", z.object({ projectId: z.string() })),
    zValidator(
      "json",
      readProjectSchema
        .omit({
          id: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        })
        .partial(),
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { projectId } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .update(projects)
        .set({ ...values })
        .where(
          and(
            eq(projects.id, projectId),
            eq(projects.userId, auth.token.id as string),
          ),
        )
        .returning();

      if (!data) return c.json({ error: "Unauthorized" }, 401);

      return c.json({ data });
    },
  )
  .delete(
    "/:projectId",
    verifyAuth(),
    zValidator("param", z.object({ projectId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { projectId } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .delete(projects)
        .where(
          and(
            eq(projects.id, projectId),
            eq(projects.userId, auth.token.id as string),
          ),
        )
        .returning({
          id: projects.id,
          name: projects.name,
        });

      if (!data) return c.json({ error: "Project not found" }, 404);

      return c.json({ data });
    },
  );

export default app;
