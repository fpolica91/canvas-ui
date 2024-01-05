import {
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
  Connection,
  addEdge,
  Instance,
  Node,
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
import { getVpc } from "../../client/aws/network/vpc";
import { getEC2 } from "../../client/aws/compute/ec2";
import type { MouseEvent as ReactMouseEvent } from "react";

export const actions = (
  get: StoreApi<InfraCanvaState>["getState"],
  set: StoreApi<InfraCanvaState>["setState"]
) => ({
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onDragStop: (
    _: ReactMouseEvent,
    node: Node,
    getIntersectingNodes: Instance.GetIntersectingNodes<never>
  ) => {
    const intersections = getIntersectingNodes(node).map((n) => n.id);
    const intersecNode = get().nodes.find(
      (node) => intersections[0] === node.id
    );
    if (intersecNode?.type === "vpc") {
      const updatedNode = {
        ...node,
        parentNode: intersecNode.id,
        extent: "parent",
        position: {
          x: node.position.x - intersecNode.position.x,
          y: node.position.y - intersecNode.position.y,
        },
      } as Node;
      const nodes = get().nodes.map((n) =>
        n.id === updatedNode.id! ? updatedNode : n
      );
      set({
        nodes,
      });
    }
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
          services: initialAwsServices,
        });

        break;
      }

      case "azure":
        {
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
            services: initialAzureServices,
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

  handleAmazonServiceCreate: async (
    service: CreateNodeType,
    nodeData: unknown,
    resetString = false
  ) => {
    if (resetString) {
      set({
        terraform: {
          ...get().terraform,
          resourceString: "",
        },
      });
    }

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
        break;
      }
      case "ec2": {
        const payload = {
          provider: get().provider,
          vms: [nodeData],
        };
        response = await getEC2(payload);
        break;
      }
      case "vpc": {
        const payload = {
          vpcs: [nodeData],
        };
        response = await getVpc(payload);
        break;
      }
    }

    if (!response) return;

    set({
      terraform: {
        ...get().terraform,
        resourceString:
          get().terraform.resourceString.trimStart() +
          response.resourcesString.trimEnd(),
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

  createNode: async (service: CreateNodeType, resourceName?: string) => {
    const id = uuidv4();
    const position = get().position;
    const nodeData = createInitialNodeData(service, resourceName);
    const data = {
      id,
      label: service.type,
      serviceInfo: service,
      nodeData: nodeData,
    };
    set({
      nodes: [...get().nodes, { id, type: service.type, data, position }],
    });
    set({ position: { x: position.x + 50, y: position.y + 50 } });

    return await get().handleAmazonServiceCreate(service, nodeData);
  },

  deleteNode: async (nodeId: string) => {
    const filteredNodes = get().nodes.filter((node) => node.id != nodeId);
    set({
      nodes: [...filteredNodes],
    });

    if (filteredNodes.length == 0) {
      set({
        terraform: {
          ...get().terraform,
          resourceString: "",
        },
      });
    } else {
      const handleAmazonServiceCreate = get().handleAmazonServiceCreate;
      const recreateServices = filteredNodes.map((filteredNode, index) =>
        handleAmazonServiceCreate(
          filteredNode.data?.serviceInfo,
          filteredNode.data.nodeData,
          index == 0
        )
      );
      await Promise.all(recreateServices);
    }
  },
});
