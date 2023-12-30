// import { shallow } from "zustand/shallow";
import { State } from "../types/store";
import ReactFlow, { Background, Controls } from "reactflow";

import "reactflow/dist/style.css";
import useStore from "../context/Canvas";

const selector = (state: State) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  nodeTypes: state.nodeTypes,
});

const Flow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, nodeTypes } =
    useStore(selector);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
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
