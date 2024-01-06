import ReactFlow, { Background, Controls, useReactFlow, Node } from "reactflow";
import { useMemo, type MouseEvent as ReactMouseEvent } from "react";
import "reactflow/dist/style.css";
import useStore from "../context/canvas";
import { EC2Node } from "./nodes/aws/compute/ec2";
import { LambdaNode } from "./nodes/aws/compute/lambda";
import { VPCNode } from "./nodes/aws/network/VpcNode";
import { S3StorageNode } from "./nodes/aws/storage/S3";
import { StorageGatewayNode } from "./nodes/aws/storage/StorageGateway";

const Flow = () => {
  const { getIntersectingNodes } = useReactFlow();

  const nodes = useStore.use.nodes();
  const edges = useStore.use.edges();
  const onNodesChange = useStore.use.onNodesChange();
  const onEdgesChange = useStore.use.onEdgesChange();
  const onConnect = useStore.use.onConnect();

  const onNodeDragStop = useStore.use.onDragStop();

  const handleNodeDragStop = (event: ReactMouseEvent, node: Node) => {
    onNodeDragStop(event, node, getIntersectingNodes as never);
  };
  const nodeTypes = useMemo(
    () => ({
      s3: S3StorageNode,
      storage_gateway: StorageGatewayNode,
      lambda: LambdaNode,
      ec2: EC2Node,
      vpc: VPCNode,
    }),
    []
  );

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
