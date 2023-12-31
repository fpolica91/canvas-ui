import {
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
  Connection,
  addEdge,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import { getBuckets } from "../../client/aws/storage/s3bucket";
import { getProvider } from "../../client/methods";
import { initialAwsServices } from "../../constants/aws/storage";
import { initialAzureServices } from "../../constants/azure/storage";
import { BucketType } from "../../constants/aws/types/storage/bucket";
import { CreateNodeType, ProviderType } from "../store/types";
import { StoreApi } from "zustand";
import { InfraCanvaState } from "./types";

export const actions = (
  get: StoreApi<InfraCanvaState>["getState"],
  set: StoreApi<InfraCanvaState>["setState"]
) => ({
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
  handleAmazonServiceCreate: async (service: CreateNodeType) => {
    switch (service.tag) {
      case "storage": {
        await get().createDefaultStorageNode(service.type);
        break;
      }
    }
  },
  createDefaultStorageNode: async (type: string) => {
    const nodes = get().nodes.map((node) => node.data.nodeData);
    const payload = {
      buckets: nodes,
    };
    let response = null;
    switch (type) {
      case "s3": {
        response = await getBuckets(payload);
        break;
      }
    }

    if (!response) return;

    set({
      terraform: {
        ...get().terraform,
        resourceString: response.resourcesString,
      },
    });
  },

  createNode: async (service: CreateNodeType, nodeData: BucketType) => {
    const id = uuidv4();
    const position = get().position;
    const data = { label: service.name, nodeData: nodeData };
    set({
      nodes: [...get().nodes, { id, type: service.type, data, position }],
    });
    set({ position: { x: position.x + 50, y: position.y + 50 } });
    await get().handleAmazonServiceCreate(service);
  },
});
