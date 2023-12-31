import { Handle, NodeProps, Position } from "reactflow";
import { Flex } from "@chakra-ui/react";
import { LambdaIcon } from "../../../../assets/components";

export const LambdaNode = ({ isConnectable }: NodeProps) => {
  return (
    <Flex borderWidth="1px" p={1} borderRadius="md" shadow="md">
      <Handle type="target" position={Position.Top} isConnectable={true} />
      <LambdaIcon />

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </Flex>
  );
};
