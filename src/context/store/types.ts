import { z } from "zod";
import type { MouseEvent as ReactMouseEvent } from "react";
import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Instance,
} from "reactflow";
import { ServicesType } from "../../types/services/CloudServices";
import { TerraformSchemaType } from "../../types/terraform/schema";
import { AxiosResponse } from "axios";

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

export type SingleCanvas = {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  provider: string;
  services: ServicesType;
  terraform: TerraformSchemaType;
  providerConfig: ProviderConfigType;
};

export type InfraCanvaAction = {
  createNode(services: CreateNodeType): void;
  getCurrentCanvas: () => SingleCanvas | undefined;
  deleteNode(nodeId: string): void;
  setInitialTerraformState: () => Promise<void>;
  onDeattachFromParent: (nodeId: string) => void;
  setCurrentCanvas: (canvasId: string) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  deleteCanvas: (canvasId: string) => void;
  saveCanvas: () => Promise<AxiosResponse<unknown, unknown>>;
  onNodeDataChange: (node: Node, nodeData: unknown) => Promise<void>;
  handleAmazonServiceCreate: (
    service: CreateNodeType,
    nodeData: unknown,
    id: string,
    resetString?: boolean
  ) => Promise<void>;
  onDragStop: (
    event: ReactMouseEvent,
    node: Node,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getIntersectingNodes: Instance.GetIntersectingNodes<never>
  ) => void;
  onProviderChange: (provider: ProviderType) => void;
  createCanvas: () => void;
};

export type InfraCanvaState = {
  canvases: SingleCanvas[];
  currentCanvas: string;
};
