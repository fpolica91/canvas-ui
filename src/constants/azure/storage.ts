export const initialAzureServices = {
  compute: [
    { name: "Virtual Machines", icon: "/ec2_icon.svg", type: "az_vm" },
    { name: "Functions", icon: "/lambda_icon.svg", type: "az_functions" },
  ],
  storage: [
    { name: "Blob Storage", icon: "/s3_icon.svg", type: "az_blob" },
    {
      name: "File Storage",
      icon: "/storage_gateway_icon.svg",
      type: "az_file",
    },
    {
      name: "Archive & Backup",
      icon: "/archive_backup_icon.svg",
      type: "az_backup",
    },
  ],
};
