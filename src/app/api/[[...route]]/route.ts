import { Hono } from "hono";
import { handle } from "hono/vercel";
import images from "@/features/images/server/route";

// Revert to edge if planning to run on the edge
export const runtime = "nodejs";

const app = new Hono().basePath("/api").route("/images", images);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
