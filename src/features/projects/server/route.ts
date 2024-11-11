import { db } from "@/db";
import { insertProjectSchema, projects } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono().post(
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
        userId: auth.user!.id,
      })
      .returning();

    if (!data) return c.json({ error: "Something went wrong" }, 400);

    return c.json({ data });
  },
);

export default app;
