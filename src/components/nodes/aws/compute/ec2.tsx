import { Handle, NodeProps, Position } from "reactflow";
import { Flex } from "@chakra-ui/react";
import { Ec2Icon } from "../../../../assets/components";
import { ToolBar } from "../../../toolbar";
import { useState } from "react";

export const EC2Node = ({ isConnectable }: NodeProps) => {
  const [toolBar, setToolBar] = useState(false);
  return (
    <>
      <ToolBar toolbarVisible={toolBar} toolbarPosition="top" />
      <Flex
        borderWidth="1px"
        p={1}
        borderRadius="md"
        shadow="md"
        onClick={() => setToolBar(!toolBar)}
      >
        <Handle type="target" position={Position.Top} isConnectable={true} />
        <Ec2Icon />

        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
      </Flex>
    </>
  );
};
