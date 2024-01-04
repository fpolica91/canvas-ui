import { NodeToolbar, Position } from "reactflow";
import { BaseToolbar } from "./basic";
interface IToolbar {
  toolbarVisible: boolean;
  toolbarPosition: string;
  onDeleteAction?: () => unknown;
}

export function ToolBar({ toolbarVisible, onDeleteAction }: IToolbar) {

  return (
    <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
      <BaseToolbar onDeleteAction={onDeleteAction} />
    </NodeToolbar>
  );
}
