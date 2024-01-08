import { S3Icon } from "../../../../assets/components";
import { BaseNode } from "../../BaseNode";
import { CanvasNodeProps } from "../../../../constants/types/canvasNode";

interface S3StorageNodeProps extends CanvasNodeProps {}

export const S3StorageNode = ({ isConnectable, data }: S3StorageNodeProps) => {
  return (
    <>
      <BaseNode
        nodeIcon={<S3Icon />}
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
    </>
  );
};
