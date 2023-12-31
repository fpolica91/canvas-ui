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
import { BucketsType } from "../types/aws/storage/bucket";
import { initialAwsServices } from "../constants/aws/storage";
import { initialAzureServices } from "../constants/azure/storage";

import { getProvider } from "../client/methods";
import { getBuckets } from "../client/aws/storage/s3bucket";

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<State>((set, get) => ({
  nodes: [],
  edges: [],
  provider: "aws",
  services: initialAwsServices,
  terraform: {
    providerString: "",
    resourceString: "",
    variableString: "",
  },
  terraformString: "",
  providerConfig: {
    provider: "aws",
    provider_source: "hashicorp/aws",
    provider_version: "5.31.0",
    region: "us-east-1",
  },
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

  setInitialTerraformState: async () => {
    const data = await getProvider(get().providerConfig);
    set({
      terraform: {
        ...get().terraform,
        providerString: data.providerString,
        variableString: data.variablesString,
      },
    });
  },

  onProviderChange: async (provider: ProviderType) => {
    set({ provider: provider });
    switch (provider) {
      case "aws": {
        set({ services: initialAwsServices });
        set({
          providerConfig: {
            provider: "aws",
            provider_source: "hashicorp/aws",
            provider_version: "5.31.0",
            region: "us-east-1",
          },
        });
        const data = await getProvider(get().providerConfig);

        set({
          terraform: {
            ...get().terraform,
            providerString: data.providerString,
            variableString: data.variablesString,
          },
        });
        break;
      }

      case "azure":
        {
          set({ services: initialAzureServices });
          set({
            providerConfig: {
              provider: "azurerm",
              provider_source: "hashicorp/azurerm",
              provider_version: "3.85.0",
            },
          });
          const data = await getProvider(get().providerConfig);
          set({
            terraform: {
              ...get().terraform,
              providerString: data.providerString,
              variableString: data.variablesString,
            },
          });
        }

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

  createNode: async (type: string, label: string, nodeData: BucketsType) => {
    const id = uuidv4();
    const position = get().position;
    const data = { label, ...nodeData };
    set({ nodes: [...get().nodes, { id, type, data, position }] });
    set({ position: { x: position.x + 50, y: position.y + 50 } });
    const response = await getBuckets(nodeData);
    set({
      terraform: {
        ...get().terraform,
        resourceString: response.resourcesString,
      },
    });
  },
}));

export default useStore;
