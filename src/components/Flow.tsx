import ReactFlow, { Background, Controls, useReactFlow, Node } from "reactflow";
import { useEffect, type MouseEvent as ReactMouseEvent } from "react";
import "reactflow/dist/style.css";
import useStore from "../context/canvas";
import { EC2Node } from "./Nodes/aws/compute/ec2";
import { LambdaNode } from "./Nodes/aws/compute/lambda";
import { VPCNode } from "./Nodes/aws/network/VpcNode";
import { S3StorageNode } from "./Nodes/aws/storage/S3";
import { StorageGatewayNode } from "./Nodes/aws/storage/StorageGateway";
import { SingleCanvas } from "../context/store/types";

const nodeTypes = {
  s3: S3StorageNode,
  storage_gateway: StorageGatewayNode,
  lambda: LambdaNode,
  ec2: EC2Node,
  vpc: VPCNode,
};
const Flow = () => {
  const { getIntersectingNodes } = useReactFlow();
  const currentCanvasId = useStore.use.currentCanvas();
  const currentStore = useStore.use
    .canvases()!
    .find((c: SingleCanvas) => c.id === currentCanvasId);

  const nodes = currentStore!.nodes;

  const edges = currentStore!.edges;

  const onNodesChange = useStore.use.onNodesChange();
  const onEdgesChange = useStore.use.onEdgesChange();
  const onConnect = useStore.use.onConnect();

  const onNodeDragStop = useStore.use.onDragStop();
  useEffect(() => {}, [currentCanvasId]);

  const handleNodeDragStop = (event: ReactMouseEvent, node: Node) => {
    onNodeDragStop(event, node, getIntersectingNodes as never);
  };

  return (
    <ReactFlow
      id={currentCanvasId}
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
      <Background id={currentCanvasId} />

      <Controls id={currentCanvasId} />
    </ReactFlow>
  );
};

export default Flow;
