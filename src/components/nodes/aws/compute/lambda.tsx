import { LambdaIcon } from "../../../../assets/components";
import { BaseNode } from "../../BaseNode";
import { CanvasNodeProps } from "../../../../constants/types/canvasNode";

interface LambdaNodeProps extends CanvasNodeProps {}

export const LambdaNode = ({ isConnectable, data }: LambdaNodeProps) => {
  return (
    <BaseNode
      nodeIcon={<LambdaIcon />}
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
