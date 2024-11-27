import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const schemaTodo = z.object({
  todo: z.string().min(1).max(255),
});

export const zTodoValidator = zValidator("json", schemaTodo);
