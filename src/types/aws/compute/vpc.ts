import { z } from "zod";

export const VirtualCloudSchema = z.object({
  type: z.literal("virtual_cloud"),
  name: z.string(),
  cidr_block: z.string(),
  enable_dns_hostnames: z.boolean(),
  enable_dns_support: z.boolean(),
  instance_tenancy: z.string(),
  tags: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
});

export type VirtualCloudType = z.infer<typeof VirtualCloudSchema>;
