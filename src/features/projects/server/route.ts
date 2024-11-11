import { insertProjectSchema } from "@/db/schema";
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
  },
);

export default app;
