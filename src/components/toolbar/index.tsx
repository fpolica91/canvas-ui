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
  console.log(data.id, toolbarVisible);
  return (
    <NodeToolbar isVisible={true} position={Position.Top} nodeId={data.id}>
      <BaseToolbar
        key={data.id}
        data={data}
        onDeleteAction={onDeleteAction}
        deattachNodeFromParent={deattachNodeFromParent}
      />
    </NodeToolbar>
  );
}
