import { db } from "@/db";
import { insertProjectSchema, projects, readProjectSchema } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
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
  );

export default app;
