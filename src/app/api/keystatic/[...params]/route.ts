import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { editorEnabled } from "@/lib/editor";

const handler = makeRouteHandler({ config });
const disabled = () => new Response("Not found", { status: 404 });

export const GET = (req: Request) => (editorEnabled() ? handler.GET(req) : disabled());
export const POST = (req: Request) => (editorEnabled() ? handler.POST(req) : disabled());
