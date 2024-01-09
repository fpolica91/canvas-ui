import { z } from "zod";

export const StorageBucketSchemaValidator = z.object({
  configuration: z.object({
    bucket: z.string(), // Ensuring it's non-nullable by removing .nullable()
    // tags: z
    //   .array(z.object({ key: z.string(), value: z.string() }))
    //   .optional()
    //   .default([]), // Assuming you want this non-optional too
  }),
  public_access_block: z.object({
    acl: z.enum([
      "private",
      "public-read",
      "public-read-write",
      "authenticated-read",
    ]),
    block_public_acls: z.boolean().default(false),
    block_public_policy: z.boolean().default(false),
    ignore_public_acls: z.boolean().default(false),
    restrict_public_buckets: z.boolean().default(false),
  }), // Assuming you want all these non-nullable and non-optional
  website_configuration: z.object({
    host_website: z.boolean().optional().default(false),
    index_document: z.string().optional(),
    error_document: z.string().optional(),
    // routing_rules: z.array(
    //   z.object({
    //     redirect: z.object({
    //       host_name: z.string(),
    //       http_redirect_code: z.number(),
    //       protocol: z.string(),
    //       replace_key_prefix_with: z.string(),
    //     }),
    //   })
    // ),
  }), // Assuming you want all these non-nullable and non-optional
  // cors_configuration: z.object({
  // cors_rules_list: z.array(
  //   z.object({
  //     allowed_headers: z.array(z.string()),
  //     allowed_methods: z.array(z.string()),
  //     allowed_origins: z.array(z.string()),
  //     expose_headers: z.array(z.string()),
  //     max_age_seconds: z.number(),
  //   })
  // ),
  // }), // Assuming you want all these non-nullable and non-optional
});
