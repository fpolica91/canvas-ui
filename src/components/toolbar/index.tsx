import { Node, NodeToolbar, Position } from "reactflow";
import { BaseToolbar } from "./basic";
interface IToolbar {
  toolbarVisible: boolean;
  data: Node;
  toolbarPosition: string;
  onDeleteAction?: () => unknown;
  deattachNodeFromParent: () => void;
}

export function ToolBar({
  toolbarVisible,
  onDeleteAction,
  deattachNodeFromParent,
  data,
}: IToolbar) {
  return (
    <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
      <BaseToolbar
        data={data}
        onDeleteAction={onDeleteAction}
        deattachNodeFromParent={deattachNodeFromParent}
      />
    </NodeToolbar>
  );
}
