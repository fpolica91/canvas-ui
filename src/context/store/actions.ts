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
import {
  CreateNodeType,
  InfraCanvaAction,
  InfraCanvaState,
  ProviderType,
} from "../store/types";
import { StoreApi } from "zustand";
import { createInitialNodeData } from "../../utils/initialNodedata";
import { getLambda } from "../../client/aws/compute/lambda";
import { getVpc } from "../../client/aws/network/vpc";
import { getEC2 } from "../../client/aws/compute/ec2";
import type { MouseEvent as ReactMouseEvent } from "react";
import _ from "lodash";

export type InfraCanvaStore = InfraCanvaState & InfraCanvaAction;
export const actions = (
  get: StoreApi<InfraCanvaStore>["getState"],
  set: StoreApi<InfraCanvaStore>["setState"]
) => ({
  onNodesChange: (changes: NodeChange[]) => {
    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;
    set({
      canvases: get().canvases.map((canvas) =>
        canvas.id === currentCanvas.id
          ? {
              ...canvas,
              nodes: applyNodeChanges(changes, canvas.nodes),
            }
          : canvas
      ),
    });
  },

  // function will delete current node and create a new one with the same id
  // onNodeDataChange: async (node: Node, nodeData: unknown) => {
  //   const currentCanvas = get().getCurrentCanvas();
  //   if (!currentCanvas) return;

  //   const nodes = currentCanvas.nodes.filter((n) => n.id !== node.id);
  //   const originalNode = currentCanvas.nodes.find((n) => n.id === node.id);

  //   let updatedNode = _.merge(originalNode, { data: { nodeData } });

  //   // const updatedNodeData = updatedNodes.map((node) => node.data.nodeData);

  //   const payload = {
  //     buckets: [updatedNode.data.nodeData],
  //   };
  //   const response = await getBuckets(payload);

  //   updatedNode = _.merge(updatedNode, {
  //     data: { resourceString: response.resourcesString },
  //   });

  //   const updatedNodes = [...nodes, updatedNode];

  //   set({
  //     canvases: get().canvases.map((canvas) =>
  //       canvas.id === currentCanvas.id
  //         ? {
  //             ...canvas,
  //             nodes: updatedNodes,
  //             terraform: {
  //               ...currentCanvas.terraform,
  //               resourceString: updatedNodes
  //                 .map((n) => "\n" + n.data.resourceString.trim() + "\n")
  //                 .join("\n"),
  //             },
  //           }
  //         : canvas
  //     ),
  //   });
  // },

  onDragStop: (
    _: ReactMouseEvent,
    node: Node,
    getIntersectingNodes: Instance.GetIntersectingNodes<never>
  ) => {
    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;
    const intersections = getIntersectingNodes(node).map((n) => n.id);
    const intersecNode = currentCanvas.nodes.find(
      (node) => intersections[0] === node.id
    );
    if (intersecNode?.type === "vpc") {
      const updatedNode = {
        ...node,
        parentNode: intersecNode.id,
        extent: "parent",
      } as Node;
      const nodes = currentCanvas.nodes.map((n) =>
        n.id === updatedNode.id! ? updatedNode : n
      );

      set({
        canvases: get().canvases.map((canvas) =>
          canvas.id === currentCanvas.id ? { ...canvas, nodes } : canvas
        ),
      });
    }
  },

  onDeattachFromParent: (nodeId: string) => {
    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;
    const nodes = currentCanvas.nodes.map((node) => {
      if (node.id === nodeId) {
        delete node.parentNode;
        delete node.extent;
        return {
          ...node,
        };
      }
      return node;
    }) as Node[];

    set({
      canvases: get().canvases.map((canvas) =>
        canvas.id === currentCanvas.id ? { ...canvas, nodes } : canvas
      ),
    });
  },

  setInitialTerraformState: async () => {
    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;
    const data = await getProvider(currentCanvas.providerConfig);
    set({
      canvases: get().canvases.map((canvas) =>
        canvas.id === currentCanvas.id
          ? _.merge(canvas, {
              terraform: {
                providerString: data.providerString,
                variableString: data.variablesString,
              },
            })
          : canvas
      ),
    });
  },

  onProviderChange: async (provider: ProviderType) => {
    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;
    switch (provider) {
      case "aws": {
        const providerConfig = {
          provider: "aws",
          provider_source: "hashicorp/aws",
          provider_version: "5.31.0",
          region: "us-east-1",
        };
        const data = await getProvider(providerConfig);
        set({
          canvases: get().canvases.map((canvas) =>
            canvas.id === currentCanvas.id
              ? {
                  ...canvas,
                  providerConfig,
                  terraform: {
                    ...canvas.terraform,
                    providerString: data.providerString,
                    variableString: data.variablesString,
                  },
                  services: initialAwsServices,
                  provider: provider,
                }
              : canvas
          ),
        });
        break;
      }
      case "azure": {
        const providerConfig = {
          provider: "azurerm",
          provider_source: "hashicorp/azurerm",
          provider_version: "3.85.0",
        };
        const data = await getProvider(providerConfig);
        set({
          canvases: get().canvases.map((canvas) =>
            canvas.id === currentCanvas.id
              ? {
                  ...canvas,
                  providerConfig,
                  terraform: {
                    ...canvas.terraform,
                    providerString: data.providerString,
                    variableString: data.variablesString,
                  },
                  services: initialAzureServices,
                  provider: provider,
                }
              : canvas
          ),
        });
        break;
      }
    }
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;
    set({
      canvases: get().canvases.map((canvas) =>
        canvas.id === currentCanvas.id
          ? {
              ...canvas,
              edges: applyEdgeChanges(changes, canvas.edges),
            }
          : canvas
      ),
    });
  },

  onConnect: (connection: Connection) => {
    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;
    set({
      canvases: get().canvases.map((canvas) =>
        canvas.id === currentCanvas.id
          ? {
              ...canvas,
              edges: addEdge(connection, canvas.edges),
            }
          : canvas
      ),
    });
  },

  handleAmazonServiceCreate: async (
    service: CreateNodeType,
    nodeData: unknown,
    id: string,
    resetString = false
  ) => {
    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;

    if (resetString) {
      set({
        canvases: get().canvases.map((canvas) =>
          canvas.id === currentCanvas.id
            ? {
                ...canvas,
                terraform: {
                  ...currentCanvas.terraform,
                  resourceString: "",
                },
              }
            : canvas
        ),
      });
    }

    let response = null;

    switch (service.type) {
      case "s3": {
        const data = _.merge(nodeData, { id });
        const payload = {
          buckets: [data],
        };
        response = await getBuckets(payload);
        break;
      }
      case "lambda": {
        const payload = {
          provider: currentCanvas.provider,
          lambdas: [nodeData],
        };
        response = await getLambda(payload);
        break;
      }
      case "ec2": {
        const payload = {
          provider: currentCanvas.provider,
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

    const updatedNodes = [
      ...currentCanvas.nodes.filter((node) => node.id !== id),
      {
        id,
        type: service.type,
        data: {
          id,
          label: service.type,
          serviceInfo: service,
          nodeData,
          resourceString: response!.resourcesString,
        },
      },
    ];

    set({
      canvases: get().canvases.map((canvas) => {
        if (canvas.id === currentCanvas.id) {
          return _.merge(canvas, {
            terraform: {
              resourceString: updatedNodes
                .map((n) => {
                  return "\n" + n.data.resourceString.trim() + "\n";
                })
                .join("\n"),
            },
            nodes: updatedNodes,
          });
        }
        return canvas;
      }),
    });
  },

  createNode: async (service: CreateNodeType, resourceName?: string) => {
    const id = uuidv4();

    const nodeData = createInitialNodeData(service, resourceName);
    const data = {
      id,
      label: service.type,
      serviceInfo: service,
      nodeData: nodeData,
    };

    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;
    const position = {
      x:
        currentCanvas.nodes.length === 0
          ? 0
          : currentCanvas.nodes[currentCanvas.nodes.length - 1].position.x + 50,
      y:
        currentCanvas.nodes.length === 0
          ? 0
          : currentCanvas.nodes[currentCanvas.nodes.length - 1].position.y + 50,
    };
    const nodes = [
      ...currentCanvas.nodes,
      {
        id,
        type: service.type,
        data,
        position,
      },
    ];

    set({
      canvases: get().canvases.map((canvas) =>
        canvas.id === currentCanvas.id ? { ...canvas, nodes } : canvas
      ),
    });

    return await get().handleAmazonServiceCreate(service, nodeData, id);
  },

  deleteNode: async (nodeId: string) => {
    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;
    const filteredNodes = currentCanvas.nodes
      .filter((node) => node.id !== nodeId)
      .map((node) => {
        if (node.parentNode === nodeId) {
          delete node.parentNode;
          return {
            ...node,
          };
        }
        return node;
      }) as Node[];

    set({
      canvases: get().canvases.map((canvas) => {
        const resourcesString = filteredNodes
          .map((node) => "\n" + node.data.resourceString.trim() + "\n")
          .join("\n");

        return canvas.id === currentCanvas.id
          ? {
              ...canvas,
              nodes: filteredNodes,
              terraform: {
                ...canvas.terraform,
                resourceString: resourcesString,
              },
            }
          : canvas;
      }),
    });
  },
});
