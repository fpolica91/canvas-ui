import { VpcIcon } from "../../../../assets/components";
import { BaseNode } from "../../BaseNode";
import { CanvasNodeProps } from "../../../../constants/types/canvasNode";

interface VPCNodeProps extends CanvasNodeProps {}

export const VPCNode = ({ isConnectable, data }: VPCNodeProps) => {

  return (
    <BaseNode 
    nodeIcon={<VpcIcon />}
    id={data.id}
    data={data}
    isConnectable={isConnectable}
    type={""}
    zIndex={0}
    xPos={0}
    yPos={0}
    dragging={false}
    selected={false}
  />
  )
};
