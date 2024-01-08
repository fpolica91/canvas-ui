export const BucketFormFields = {
  configuration: {
    label: "Configuration",
    type: "object",
    columns: 1,
  },
  public_access_block: {
    label: "Public Access Block",
    type: "object",
    columns: 2,
  },
  "public_access_block.acl": {
    label: "ACL",
    type: "select",
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
};
