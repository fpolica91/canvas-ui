import { ComponentType } from "react";
import { z } from "zod";

import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeProps,
} from "reactflow";
import { BucketsType } from "./aws/storage/bucket";
import { ServicesType } from "./services/CloudServices";
import { TerraformSchemaType } from "./terraform/schema";

export const Provider = z.enum(["aws", "azure", "gcp"]);

export const providerConfig = z.object({
  provider: z.string(),
  provider_source: z.string(),
  provider_version: z.string(),
  region: z.string().optional(),
});

export type ProviderConfigType = z.infer<typeof providerConfig>;

export type ProviderType = z.infer<typeof Provider>;

export type State = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  position: { x: number; y: number };
  nodeTypes: { [key: string]: ComponentType<NodeProps> };
  createNode(type: string, label: string, nodeData: BucketsType): void;
  provider: ProviderType;
  services: ServicesType;
  onProviderChange: (provider: ProviderType) => void;
  terraformString: string;
  terraform: TerraformSchemaType;
  providerConfig: ProviderConfigType;
  setInitialTerraformState: () => Promise<void>;
};
