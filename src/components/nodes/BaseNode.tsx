import { useState } from "react";
import useStore from "../../context/canvas";
import { CanvasNodeProps } from "../../constants/types/canvasNode";
import { ToolBar } from "../toolbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Handle, Position } from "reactflow";

export interface BaseNodeProps extends CanvasNodeProps {
    nodeIcon?: React.JSX.Element;
}

export const BaseNode = ({ isConnectable, data, nodeIcon }: BaseNodeProps) => {
    const [toolBar, setToolBar] = useState(false);
    const deleteNode = useStore.use.deleteNode();
  
    const handleRemoveNode = () => {
      deleteNode(data.id)
    };

    return (
        <>
            <ToolBar toolbarVisible={toolBar} onDeleteAction={handleRemoveNode} toolbarPosition="top" />
            <Flex flexDir={'column'} alignItems={'center'} onClick={() => setToolBar(!toolBar)}>
                <Flex borderWidth="1px" p={1} borderRadius="md" shadow="md">
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
                <Box width={'150px'} position={'absolute'} my={10} onClick={() => console.log('LOCOTE')} color={'white'} fontSize={11}>
                    <Text lineHeight={1} fontSize={10}>{data && data.label}</Text>
                </Box>
            </Flex>
        </>
    )
};