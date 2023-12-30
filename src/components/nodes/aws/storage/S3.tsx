import { Handle, NodeProps, Position } from "reactflow";
import { Flex } from "@chakra-ui/react";
import { S3Icon } from "../../../../assets/components";
// Update with the actual path to your image

export const S3StorageNode = ({ isConnectable }: NodeProps) => {
  return (
    <Flex borderWidth="1px" p={1} borderRadius="md" shadow="md">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <S3Icon />

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </Flex>
  );
};
