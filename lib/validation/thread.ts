import * as z from "zod";

export const ThreadValidation= z.object({
    Thread:z.string().nonempty().min(3,{message:"Minimum 3 characters"}),
    AccountID: z.string(),
}) 
export const CommentValidation= z.object({
    Thread:z.string().nonempty().min(3,{message:"Minimum 3 characters"}),
    AccountID: z.string(),
}) 