import { z } from "zod";

export const vpcSchema = z.object({
  configuration: z
    .object({
      name: z.string().nullable(),
      cidr_block: z.string(),
      tags: z
        .array(z.object({ key: z.string(), value: z.string() }))
        .optional(),
    })
    .optional(),
});

export type VpcType = z.infer<typeof vpcSchema>;
