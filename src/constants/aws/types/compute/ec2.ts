import { z } from "zod";

export const EC2Schema = z.object({
  configuration: z
    .object({
      name: z.string().nullable(),
      ami: z.string(),
      instance_type: z.string(),
      tags: z
        .array(z.object({ key: z.string(), value: z.string() }))
        .optional(),
    })
    .optional(),
});

export type EC2Type = z.infer<typeof EC2Schema>;
