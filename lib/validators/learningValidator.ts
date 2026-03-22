import { z } from "zod";

// We define exactly what API is allowed to accept
export const createItemSchema = z.object({
    title: z.string().min(3, "Title must be atleast 3 character long"),
    type: z.string().min(2, "Type is required")
});