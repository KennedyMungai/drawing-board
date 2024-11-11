import authConfig from "@/auth.config";
import ai from "@/features/ai/server/route";
import images from "@/features/images/server/route";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import { config } from "dotenv";
import { Hono } from "hono";
import { handle } from "hono/vercel";

// Revert to edge if planning to run on the edge
export const runtime = "nodejs";

config({ path: ".env.local" });

const getAuthConfig = (): AuthConfig => {
  return {
    secret: process.env.AUTH_SECRET,
    ...authConfig,
  };
};

const app = new Hono()
  .basePath("/api")
  .use("*", initAuthConfig(getAuthConfig))
  .route("/images", images)
  .route("/ai", ai);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
