import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono().post(
  "/generate-image",
  verifyAuth(),
  zValidator("json", z.object({ prompt: z.string() })),
  async (c) => {
    const { prompt } = c.req.valid("json");

    return c.json({ data: prompt });
  },
);

export default app;
