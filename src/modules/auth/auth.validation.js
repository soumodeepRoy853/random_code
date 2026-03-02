import { z } from "zod";

export const registerSchema = z.object({
    userName: z.string().min(2),
    email: z.string().email("Invalid email"),
    password: z.string().min(6),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6),
});