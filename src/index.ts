import { Hono } from "hono";
import todo from "./todos";

const app = new Hono().basePath("/api");

app.route("todos", todo);

app.get("/healt", async (c) => {
  return c.json({ message: "API IS UP🚀" });
});

export default app;

