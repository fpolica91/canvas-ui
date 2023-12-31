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
};
