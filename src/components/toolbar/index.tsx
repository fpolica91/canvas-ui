import { NodeToolbar, Position } from "reactflow";
import { BaseToolbar } from "./basic";
interface IToolbar {
  toolbarVisible: boolean;
  toolbarPosition: string;
  onDeleteAction?: () => unknown;
  deattachNodeFromParent: () => void;
}

export function ToolBar({
  toolbarVisible,
  onDeleteAction,
  deattachNodeFromParent,
}: IToolbar) {
  return (
    <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
      <BaseToolbar
        onDeleteAction={onDeleteAction}
        deattachNodeFromParent={deattachNodeFromParent}
      />
    </NodeToolbar>
  );
}
