import { ComponentType } from "react";
import { z } from "zod";
import type { MouseEvent as ReactMouseEvent } from "react";
import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeProps,
  Instance,
} from "reactflow";
import { ServicesType } from "../../types/services/CloudServices";
import { TerraformSchemaType } from "../../types/terraform/schema";

export const Provider = z.enum(["aws", "azure", "gcp"]);

export const providerConfig = z.object({
  provider: z.string(),
  provider_source: z.string(),
  provider_version: z.string(),
  region: z.string().optional(),
});

export const createNodeSchema = z.object({
  name: z.string(),
  resourceName: z.string().optional(),
  icon: z.string(),
  type: z.string(),
  tag: z.string(),
  provider: z.string(),
});

export type ProviderConfigType = z.infer<typeof providerConfig>;
export type CreateNodeType = z.infer<typeof createNodeSchema>;
export type ProviderType = z.infer<typeof Provider>;

export type InfraCanvaState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  position: { x: number; y: number };
  nodeTypes: { [key: string]: ComponentType<NodeProps> };
  createNode(services: CreateNodeType): void;
  deleteNode(nodeId: string): void;
  provider: string;
  createDefaultNode: (type: string) => Promise<void>;
  services: ServicesType;
  onProviderChange: (provider: ProviderType) => void;
  terraformString: string;
  terraform: TerraformSchemaType;
  providerConfig: ProviderConfigType;
  setInitialTerraformState: () => Promise<void>;
  onDeattachFromParent: (nodeId: string) => void;
  handleAmazonServiceCreate: (
    service: CreateNodeType,
    nodeData: unknown,
    resetString?: boolean
  ) => Promise<void>;
  onDragStop: (
    event: ReactMouseEvent,
    node: Node,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getIntersectingNodes: Instance.GetIntersectingNodes<any>
  ) => void;
};
