import { z } from "zod";

export const Services = z.object({
  compute: z.array(
    z.object({
      name: z.string(),
      icon: z.string(),
      type: z.string(),
      tag: z.string(),
      provider: z.string(),
    })
  ),
  storage: z.array(
    z.object({
      name: z.string(),
      icon: z.string(),
      type: z.string(),
      tag: z.string(),
      provider: z.string(),
    })
  ),
  network: z.array(
    z.object({
      name: z.string(),
      icon: z.string(),
      type: z.string(),
      tag: z.string(),
      provider: z.string(),
    })
  ),
});

export type ServicesType = z.infer<typeof Services>;
