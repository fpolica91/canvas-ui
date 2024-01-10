export const BucketFormFields = {
  "configuration.bucket": {
    type: "text",
    label: "Bucket Name",
  },
  "configuration.tags": {
    title: "Configuration Tags",
    type: "array",
    label: "Tags",
    columns: 2,
    min: 0,
    max: 5,
    properties: {
      value: {
        type: "text",
        label: "Value",
      },
      key: {
        type: "text",
        label: "Key",
      },
    },
  },
  "public_access_block.acl": {
    label: "ACL",
    type: "select",
    options: [
      "private",
      "public-read",
      "public-read-write",
      "authenticated-read",
    ],
  },
  "public_access_block.block_public_acls": {
    label: "Block Public ACLs",
    type: "switch",
  },
  "public_access_block.block_public_policy": {
    label: "Block Public Policy",
    type: "switch",
  },
  "public_access_block.ignore_public_acls": {
    label: "Ignore Public ACLs",
    type: "switch",
  },
  "public_access_block.restrict_public_buckets": {
    label: "Restrict Public Buckets",
    type: "switch",
  },
  website_configuration: {
    label: "Website Configuration",
    type: "object",
    columns: 2,
  },
  "website_configuration.host_website": {
    label: "Host Website",
    type: "switch",
  },
  "website_configuration.index_document": {
    label: "Index Document",
    type: "text",
  },
  "website_configuration.error_document": {
    label: "Error Document",
    type: "text",
  },
  cors_configuration: {
    label: "CORS Rules List",
    type: "object",
    columns: 2,
  },
  "cors_configuration.cors_rules_list": {
    type: "array",
    title: "CORS Rules List",
    label: "CORS Rules List",
    items: [
      "cors_configuration.cors_rules_list.allowed_headers" as const,
      {
        title: "Allowed Headers",
        label: "Allowed Headers",
        name: "allowed_headers",
        columns: 1,
        type: "array",
      },
      "cors_configuration.cors_rules_list.allowed_methods" as const,
      {
        title: "Allowed Methods",
        label: "Allowed Methods",
        name: "allowed_methods",
        columns: 1,
        type: "array",
      },
      "cors_configuration.cors_rules_list.allowed_origins" as const,
      {
        title: "Allowed Origins",
        label: "Allowed Origins",
        name: "allowed_origins",
        columns: 1,
        type: "array",
      },
    ],
  },
};
