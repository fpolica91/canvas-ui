import { Ec2Icon } from "../../../../assets/components";
import { BaseNode } from "../../BaseNode";
import { CanvasNodeProps } from "../../../../constants/types/canvasNode";

interface EC2NodeProps extends CanvasNodeProps {}

export const EC2Node = ({ isConnectable, data }: EC2NodeProps) => {
  return (
    <BaseNode
      nodeIcon={<Ec2Icon />}
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
  );
};
