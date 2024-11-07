import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono().post(
  "/generate-image",
  // TODO: Add verification
  zValidator("json", z.object({ prompt: z.string() })),
  async (c) => {
    const { prompt } = c.req.valid("json");

    return c.json({ data: prompt });
  },
);

export default app;
