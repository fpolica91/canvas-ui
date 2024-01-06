import { StorageGatewayIcon } from "../../../../assets/components";
import { CanvasNodeProps } from "../../../../constants/types/canvasNode";
import { BaseNode } from "../../BaseNode";

interface StorageGatewayNodeProps extends CanvasNodeProps {}

export const StorageGatewayNode = ({
  isConnectable,
  data,
}: StorageGatewayNodeProps) => {
  return (
    <BaseNode
      nodeIcon={<StorageGatewayIcon />}
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
