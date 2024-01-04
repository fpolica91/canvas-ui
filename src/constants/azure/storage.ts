export const initialAzureServices = {
  compute: [
    {
      name: "Virtual Machines",
      icon: "/ec2_icon.svg",
      type: "az_vm",
      tag: "compute",
      provider: "azure",
    },
    {
      name: "Functions",
      icon: "/lambda_icon.svg",
      type: "az_functions",
      tag: "compute",
      provider: "azure",
    },
  ],
  storage: [
    {
      name: "Blob Storage",
      icon: "/s3_icon.svg",
      type: "az_blob",
      tag: "storage",
      provider: "azure",
    },
    {
      name: "File Storage",
      icon: "/storage_gateway_icon.svg",
      type: "az_file",
      tag: "storage",
      provider: "azure",
    },
    {
      name: "Archive & Backup",
      icon: "/archive_backup_icon.svg",
      type: "az_backup",
      tag: "storage",
      provider: "azure",
    },
  ],
  network: [
    {
      name: "Virtual Network",
      icon: "/vpc_icon.svg",
      type: "az_vnet",
      tag: "network",
      provider: "azure",
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
