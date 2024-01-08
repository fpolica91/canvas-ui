import { initialAwsServices } from "../../constants/aws/storage";
import { v4 as uuidv4 } from "uuid";
import { generateName } from "../../utils/nameGenerator";

export const canvas = {
  name: generateName(),
  id: uuidv4(),
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
};

export const initialState = {
  canvases: [canvas],
  currentCanvas: canvas.id,
};
