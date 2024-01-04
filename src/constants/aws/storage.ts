export const initialAwsServices = {
  compute: [
    {
      name: "EC2",
      icon: "/ec2_icon.svg",
      type: "ec2",
      tag: "compute",
      provider: "aws",
    },
    {
      name: "Lambda",
      icon: "/lambda_icon.svg",
      type: "lambda",
      tag: "compute",
      provider: "aws",
    },
  ],
  storage: [
    {
      name: "S3",
      icon: "/s3_icon.svg",
      type: "s3",
      tag: "storage",
      provider: "aws",
    },
    {
      name: "Storage Gateway",
      icon: "/storage_gateway_icon.svg",
      type: "storage_gateway",
      tag: "storage",
      provider: "aws",
    },
    {
      name: "Archive & Backup",
      icon: "/archive_backup_icon.svg",
      type: "storage_backup",
      tag: "storage",
      provider: "aws",
    },
  ],
  network: [
    {
      name: "VPC",
      icon: "/vpc_icon.svg",
      type: "vpc",
      tag: "network",
      provider: "aws",
    },
    // {
    //   name: "Route 53",
    //   icon: "/route_53_icon.svg",
    //   type: "route_53",
    //   tag: "network",
    //   provider: "aws",
    // },
    // {
    //   name: "Direct Connect",
    //   icon: "/direct_connect_icon.svg",
    //   type: "direct_connect",
    //   tag: "network",
    //   provider: "aws",
    // },
  ],
};
