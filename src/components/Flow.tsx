import ReactFlow, { Background, Controls, useReactFlow, Node } from "reactflow";
import type { MouseEvent as ReactMouseEvent } from "react";
import "reactflow/dist/style.css";
import useStore from "../context/canvas";

const Flow = () => {
  const { getIntersectingNodes } = useReactFlow();

  const nodes = useStore.use.nodes();
  const edges = useStore.use.edges();
  const onNodesChange = useStore.use.onNodesChange();
  const onEdgesChange = useStore.use.onEdgesChange();
  const onConnect = useStore.use.onConnect();
  const nodeTypes = useStore.use.nodeTypes();
  const onNodeDragStop = useStore.use.onDragStop();

  const handleNodeDragStop = (event: ReactMouseEvent, node: Node) => {
    onNodeDragStop(event, node, getIntersectingNodes);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDragStop={handleNodeDragStop}
      fitView
      style={{
        background: "#2d3748",
      }}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default Flow;
