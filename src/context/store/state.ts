import { LambdaNode } from "../../components/nodes/aws/compute/lambda";
import { S3StorageNode } from "../../components/nodes/aws/storage/S3";
import { StorageGateway } from "../../components/nodes/aws/storage/StorageGateway";
import { initialAwsServices } from "../../constants/aws/storage";

export const initialState = {
  nodes: [],
  edges: [],
  provider: "aws",
  services: initialAwsServices,
  terraform: {
    providerString: "",
    resourceString: "",
    variableString: "",
  },
  terraformString: "",
  providerConfig: {
    provider: "aws",
    provider_source: "hashicorp/aws",
    provider_version: "5.31.0",
    region: "us-east-1",
  },
  nodeTypes: {
    s3: S3StorageNode,
    storage_gateway: StorageGateway,
    lambda: LambdaNode,
  },

  position: { x: 0, y: 0 },
};
