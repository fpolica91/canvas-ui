import { StoreApi } from "zustand";
import { InfraCanvaStore } from "../store/actions";
import { getBuckets } from "../../client/aws/storage/s3bucket";
import _ from "lodash";
import { Node } from "reactflow";
import { getLambda } from "../../client/aws/compute/lambda";
import { getEC2 } from "../../client/aws/compute/ec2";
import { getVpc } from "../../client/aws/network/vpc";

async function onNodeDataChangeHelper(
  node: Node,
  updatedNode: Node & { data: { nodeData: unknown } },
  provider: string
) {
  switch (node.type) {
    case "s3": {
      const payload = {
        buckets: [updatedNode.data.nodeData],
      };
      const response = await getBuckets(payload);
      console.log(response, "the response");
      return response;
    }
    case "lambda": {
      const payload = {
        provider,
        lambdas: [updatedNode.data.nodeData],
      };
      return await getLambda(payload);
    }
    case "ec2": {
      const payload = {
        provider,
        vms: [updatedNode.data.nodeData],
      };
      return await getEC2(payload);
    }
    case "vpc": {
      const payload = {
        vpcs: [updatedNode.data.nodeData],
      };
      return await getVpc(payload);
    }
  }
}

export const nodeSlice = (
  get: StoreApi<InfraCanvaStore>["getState"],

  set: StoreApi<InfraCanvaStore>["setState"]
) => ({
  onNodeDataChange: async (node: Node, nodeData: unknown) => {
    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;

    const nodes = currentCanvas.nodes.filter((n) => n.id !== node.id);
    const originalNode = currentCanvas.nodes.find((n) => n.id === node.id);

    let updatedNode = _.merge(originalNode, { data: { nodeData } });

    const provider = get().getCurrentCanvas()?.provider as string;

    const response = await onNodeDataChangeHelper(
      updatedNode,
      updatedNode,
      provider
    );
    console.log(response, "the response");
    updatedNode = _.merge(updatedNode, {
      data: { resourceString: response!.resourcesString },
    });

    const updatedNodes = [...nodes, updatedNode];

    set({
      canvases: get().canvases.map((canvas) =>
        canvas.id === currentCanvas.id
          ? {
              ...canvas,
              nodes: updatedNodes,
              terraform: {
                ...currentCanvas.terraform,
                resourceString: updatedNodes
                  .map((n) => "\n" + n.data.resourceString.trim() + "\n")
                  .join("\n"),
              },
            }
          : canvas
      ),
    });
  },
});
