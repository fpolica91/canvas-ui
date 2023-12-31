import { z } from "zod";

export const Services = z.object({
  compute: z.array(
    z.object({ name: z.string(), icon: z.string(), type: z.string() })
  ),
  storage: z.array(
    z.object({ name: z.string(), icon: z.string(), type: z.string() })
  ),
});

export type ServicesType = z.infer<typeof Services>;
