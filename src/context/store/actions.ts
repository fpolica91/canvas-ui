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
import { CreateNodeType, ProviderType } from "../store/types";
import { StoreApi } from "zustand";
import { InfraCanvaState } from "./types";
import { createInitialNodeData } from "../../utils/initialNodedata";
import { getLambda } from "../../client/aws/compute/lambda";

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
    const nodeData = createInitialNodeData(service);

    let response = null;
    switch (service.type) {
      case "s3": {
        const payload = {
          buckets: [nodeData],
        };
        response = await getBuckets(payload);
        break;
      }
      case "lambda": {
        const payload = {
          provider: get().provider,
          lambdas: [nodeData],
        };

        response = await getLambda(payload);
        console.log(response, "the response");
        break;
      }
    }

    if (!response) return;

    set({
      terraform: {
        ...get().terraform,
        resourceString:
          get().terraform.resourceString + response.resourcesString,
      },
    });
  },

  // createDefaultComputeNode: async (type: string) => {},

  createDefaultNode: async (type: string) => {
    const nodes = get()
      .nodes.filter((node) => node.type === type)
      .map((node) => node.data.nodeData);
    let response = null;
    switch (type) {
      case "s3": {
        const payload = {
          buckets: nodes,
        };
        response = await getBuckets(payload);
        break;
      }
      case "lambda": {
        const payload = {
          lambdas: nodes,
        };

        response = await getLambda(payload);
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

  createNode: async (service: CreateNodeType) => {
    const id = uuidv4();
    const position = get().position;
    const nodeData = createInitialNodeData(service);
    const data = { label: service.type, nodeData: nodeData };
    set({
      nodes: [...get().nodes, { id, type: service.type, data, position }],
    });
    set({ position: { x: position.x + 50, y: position.y + 50 } });

    await get().handleAmazonServiceCreate(service);
  },
});
