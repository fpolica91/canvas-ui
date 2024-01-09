import { z } from "zod";

export const ComputeEC2SchemaValidator = z.object({
  configuration: z.object({
    name: z.string().nullable(),
    ami: z.string(),
    instance_type: z.string(),
  }),
});

export const ComputeLambdaSchemaValidator = z.object({
  configuration: z.object({
    name: z.string().nullable(),
    function_name: z.string().nullable(),
    runtime: z.string().nullable(),

    // tags: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
  }),
});
