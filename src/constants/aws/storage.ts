export const initialAwsServices = {
  compute: [
    { name: "EC2", icon: "/ec2_icon.svg", type: "ec2" },
    { name: "Lambda", icon: "/lambda_icon.svg", type: "lambda" },
  ],
  storage: [
    { name: "S3", icon: "/s3_icon.svg", type: "s3" },
    {
      name: "Storage Gateway",
      icon: "/storage_gateway_icon.svg",
      type: "storage_gateway",
    },
    {
      name: "Archive & Backup",
      icon: "/archive_backup_icon.svg",
      type: "storage_backup",
    },
  ],
};
