import { Handle, NodeProps, Position } from "reactflow";
import { Flex } from "@chakra-ui/react";
import { StorageGatewayIcon } from "../../../../assets/components";

export const StorageGateway = ({ isConnectable }: NodeProps) => {
  return (
    <Flex borderWidth="1px" p={1} borderRadius="md" shadow="md">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <StorageGatewayIcon />

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </Flex>
  );
};
