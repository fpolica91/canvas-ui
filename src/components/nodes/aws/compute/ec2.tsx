import { Handle, NodeProps, Position } from "reactflow";
import { Flex } from "@chakra-ui/react";
import { Ec2Icon } from "../../../../assets/components";

export const EC2Node = ({ isConnectable }: NodeProps) => {
  return (
    <Flex borderWidth="1px" p={1} borderRadius="md" shadow="md">
      <Handle type="target" position={Position.Top} isConnectable={true} />
      <Ec2Icon />

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </Flex>
  );
};
