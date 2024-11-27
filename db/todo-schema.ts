import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todoTable = sqliteTable("todos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  todo: text("todo").notNull(),
  isDone: integer("is_done", { mode: "boolean" }).default(false),
  createAt: text("create_at").default(sql`CURRENT_TIMESTAMP`),
});
