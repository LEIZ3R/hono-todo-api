import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

import { todoTable } from "../../db/todo-schema";
import { zTodoValidator } from "./validator";

const todo = new Hono<{ Bindings: { DB: D1Database } }>();

todo
  .get("/", async (c) => {
    try {
      const db = drizzle(c.env.DB);
      const res = await db.select().from(todoTable);
      if (res.length === 0) {
        return c.json({ message: "No todos found" }, 404);
      }
      return c.json(res);
    } catch (e) {
      return c.json({ message: "Error fetching todos", error: e }, 500);
    }
  })
  .post("/", zTodoValidator, async (c) => {
    const todo = c.req.valid("json");
    try {
      const db = drizzle(c.env.DB);
      await db.insert(todoTable).values(todo).returning();
      return c.json({ message: "Todo created" }, 201);
    } catch (e) {
      return c.json({ message: "Error creating todo", error: e }, 500);
    }
  })
  .delete("/:id", async (c) => {
    try {
      const db = drizzle(c.env.DB);
      const id = c.req.param("id");
      await db.delete(todoTable).where(eq(todoTable.id, +id));
      return c.json({ message: "Todo deleted" }, 200);
    } catch (e) {
      return c.json({ message: "Error deleting todo", error: e }, 500);
    }
  });

export default todo;
