import { Handle, NodeProps, Position } from "reactflow";
import { Box, Flex, Text } from "@chakra-ui/react";
import { S3Icon } from "../../../../assets/components";
// Update with the actual path to your image

export interface CanvasNodeProps extends NodeProps {
  label?: string;
}

export const S3StorageNode = ({ isConnectable, data }: CanvasNodeProps) => {
  return (
    <Flex flexDir={'column'} alignItems={'center'}>
      <Flex borderWidth="1px" p={1} borderRadius="md" shadow="md">
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
        <S3Icon />
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </Flex>
      <Box width={'150px'} position={'absolute'} my={10} onClick={() => console.log('LOCOTE')} color={'white'} fontSize={11}>
        <Text lineHeight={1} fontSize={10}>{data && data.label}</Text>
      </Box>
    </Flex>

  );
};
