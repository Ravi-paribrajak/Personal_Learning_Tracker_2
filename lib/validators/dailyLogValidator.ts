import { z } from "zod";

export const dailyLogSchema = z.object({

    date: z.string().min(1, "Date is Required"),
    build_hours: z.number().min(0, "Build hours can't be negative"),
    reading_hours: z.number().min(0, "Reading hour cannot be negative"),
    ai_used: z.boolean(),
    confidence_score: z.number().min(1, "Score must be at least 1").max(10, "Score cannot exceed 10!"),
    summary: z.string().min(3, "Please Provide a brief summary")

});