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

export const Provider = z.enum(["aws", "azure", "gcp"]);
export type ProviderType = z.infer<typeof Provider>;

export const Services = z.object({
  compute: z.array(
    z.object({ name: z.string(), icon: z.string(), type: z.string() })
  ),
  storage: z.array(
    z.object({ name: z.string(), icon: z.string(), type: z.string() })
  ),
});

export type ServicesType = z.infer<typeof Services>;

export type State = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  position: { x: number; y: number };
  nodeTypes: { [key: string]: ComponentType<NodeProps> };
  createNode(type: string, label: string): void;
  provider: ProviderType;
  services: ServicesType;
  onProviderChange: (provider: ProviderType) => void;
  terraformString: string;
};
