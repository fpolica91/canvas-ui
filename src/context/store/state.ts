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
  providerConfig: {
    provider: "aws",
    provider_source: "hashicorp/aws",
    provider_version: "5.31.0",
    region: "us-east-1",
  },

  position: { x: 0, y: 0 },
};
