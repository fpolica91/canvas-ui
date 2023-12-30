import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import {
  Connection,
  EdgeChange,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import { ProviderType, State } from "../types/store";
import { S3StorageNode } from "../components/nodes/aws/storage/S3";
import { StorageGateway } from "../components/nodes/aws/storage/StorageGateway";
import axios from "axios";
const buckets = `{
  "buckets": [
    {
      "configuration": {
        "bucket": "ssssdfsgagdagadgag2estdgcssdafag",
        "tags": [
          { "key": "Environment", "value": "Dev" },
          { "key": "Project", "value": "ProjectX" }
        ]
      },
      "public_access_block": {
        "acl": "public-read",
        "block_public_acls": false,
        "block_public_policy": false,
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      },
      "website_configuration": {
        "host_website": true,
        "index_document": "index.html",
        "error_document": "error.html",
        "routing_rules": [{
          "redirect": {
            "host_name": "documents/",
            "http_redirect_code":  204,
            "protocol": "https",
            "replace_key_prefix_with": "/docs"
          }
        }]
      },
    "cors_configuration": {
      "cors_rules_list": [{
        "allowed_headers": ["*"],
        "allowed_methods": ["GET", "PUT"],
        "allowed_origins": ["*"],
        "expose_headers": ["x-amz-server-side-encryption"],
        "max_age_seconds": 3000
      },
      {
        "allowed_headers": ["Authorization"],
        "allowed_methods": ["GET"],
        "allowed_origins": ["*"],
        "expose_headers": ["x-amz-server-side-encryption"],
        "max_age_seconds": 3000
      }]
    }
    }
  ]
}`;

const initialAwsServices = {
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

const initialAzureServices = {
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

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<State>((set, get) => ({
  nodes: [],
  edges: [],
  provider: "aws",
  services: initialAwsServices,
  terraformString: "",
  nodeTypes: {
    s3: S3StorageNode,
    storage_gateway: StorageGateway,
  },

  position: { x: 0, y: 0 },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onProviderChange: (provider: ProviderType) => {
    set({ provider: provider });
    switch (provider) {
      case "aws":
        set({ services: initialAwsServices });
        break;
      case "azure":
        set({ services: initialAzureServices });
        break;
      default:
        set({ services: initialAwsServices });
    }
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  createNode(type: string, label: string) {
    const id = uuidv4();
    const position = get().position;
    const data = { label };
    set({ nodes: [...get().nodes, { id, type, data, position }] });
    set({ position: { x: position.x + 50, y: position.y + 50 } });
    axios
      .post("http://localhost:8080/createbuckets", JSON.parse(buckets), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        set({ terraformString: response.data });
      })
      .catch((error) => console.log(error));
  },
}));

export default useStore;
