import { useState } from "react";
import useStore from "../../context/canvas";
import { CanvasNodeProps } from "../../constants/types/canvasNode";
import { ToolBar } from "../toolbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Handle, NodeResizer, Position } from "reactflow";

export interface BaseNodeProps extends CanvasNodeProps {
  nodeIcon?: React.JSX.Element;
  padding?: number;
  borderWidth?: string;
  resizeable?: boolean;
}

export const BaseNode = ({
  isConnectable,
  data,
  nodeIcon,
  padding = 1,
  borderWidth = "1px",
  resizeable = false,
}: BaseNodeProps) => {
  const [toolBar, setToolBar] = useState(false);
  const deleteNode = useStore.use.deleteNode();

  const handleRemoveNode = () => {
    deleteNode(data.id);
  };

  return (
    <>
      {resizeable && <NodeResizer minWidth={100} minHeight={50} />}
      <ToolBar
        toolbarVisible={toolBar}
        onDeleteAction={handleRemoveNode}
        toolbarPosition="top"
      />
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        onClick={() => setToolBar(!toolBar)}
      >
        <Flex borderWidth={borderWidth} p={padding} borderRadius="md">
          <Handle
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
          />
          {nodeIcon && nodeIcon}
          <Handle
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
          />
        </Flex>
        <Box
          width={"150px"}
          position={"absolute"}
          my={10}
          onClick={() => console.log("LOCOTE")}
          color={"white"}
          fontSize={11}
        >
          <Text lineHeight={1} fontSize={10}>
            {data && data.label}
          </Text>
        </Box>
      </Flex>
    </>
  );
};
