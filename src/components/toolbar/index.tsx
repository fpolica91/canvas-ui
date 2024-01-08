import { Node, NodeToolbar, Position } from "reactflow";
import { BaseToolbar } from "./basic";
interface IToolbar {
  toolbarVisible: boolean;
  data: Node;
  toolbarPosition: string;
}

export function ToolBar({ toolbarVisible, data }: IToolbar) {
  return (
    <NodeToolbar
      isVisible={toolbarVisible}
      position={Position.Top}
      nodeId={data.id}
    >
      <BaseToolbar key={data.id} data={data} />
    </NodeToolbar>
  );
}
