import { Handle, NodeProps, Position } from "reactflow";
import { Flex } from "@chakra-ui/react";
import { VpcIcon } from "../../../../assets/components";

export const VPCNode = ({ isConnectable }: NodeProps) => {
  return (
    <Flex borderWidth="1px" p={1} borderRadius="md" shadow="md">
      <Handle type="target" position={Position.Top} isConnectable={true} />
      <VpcIcon />

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </Flex>
  );
};
