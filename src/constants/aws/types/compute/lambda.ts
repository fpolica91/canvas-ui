import { z } from "zod";

// "filename"      : "lambda_function_payload.zip",
// "function_name" : "lambda_function_name",
// "runtime": "nodejs18.x",
// "name": "mylambda",
export const LambdaSchema = z.object({
  configuration: z
    .object({
      name: z.string().nullable(),
      function_name: z.string().nullable(),
      runtime: z.string().nullable(),
      tags: z
        .array(z.object({ key: z.string(), value: z.string() }))
        .optional(),
    })
    .optional(),
});

export type LambdaType = z.infer<typeof LambdaSchema>;
