import { NodeToolbar, Position } from "reactflow";
import { BaseToolbar } from "./basic";
interface IToolbar {
  toolbarVisible: boolean;
  toolbarPosition: string;
}

export function ToolBar({ toolbarVisible }: IToolbar) {
  return (
    <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
      <BaseToolbar />
    </NodeToolbar>
  );
}
