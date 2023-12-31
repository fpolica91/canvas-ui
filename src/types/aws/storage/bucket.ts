import { z } from "zod";

export const bucketSchema = z.object({
  configuration: z.object({
    bucket: z.string().nullable(),
    tags: z.array(z.object({ key: z.string(), value: z.string() })).nullable(),
  }),
  public_access_block: z
    .object({
      acl: z.string(),
      block_public_acls: z.boolean(),
      block_public_policy: z.boolean(),
      ignore_public_acls: z.boolean(),
      restrict_public_buckets: z.boolean(),
    })
    .optional(),

  website_configuration: z
    .object({
      host_website: z.boolean(),
      index_document: z.string(),
      error_document: z.string(),
      routing_rules: z.array(
        z.object({
          redirect: z.object({
            host_name: z.string(),
            http_redirect_code: z.number(),
            protocol: z.string(),
            replace_key_prefix_with: z.string(),
          }),
        })
      ),
    })
    .optional(),

  cors_configuration: z
    .object({
      cors_rules_list: z.array(
        z.object({
          allowed_headers: z.array(z.string()),
          allowed_methods: z.array(z.string()),
          allowed_origins: z.array(z.string()),
          expose_headers: z.array(z.string()),
          max_age_seconds: z.number(),
        })
      ),
    })
    .optional(),
});

export const BucketsSchema = z.object({
  type: z.literal("buckets"),
  buckets: z.array(bucketSchema),
});

export type BucketsType = z.infer<typeof BucketsSchema>;
