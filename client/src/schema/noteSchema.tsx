import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  text: z.string().trim(),
});

export type noteType = z.infer<typeof noteSchema>;
