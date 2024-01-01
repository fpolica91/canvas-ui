import { LambdaSchema } from "../constants/aws/types/compute/lambda";
import { bucketSchema } from "../constants/aws/types/storage/bucket";
import { CreateNodeType } from "../context/store/types";
import { generateName } from "./nameGenerator";

export function createInitialNodeData(service: CreateNodeType) {
  switch (service.provider) {
    case "aws": {
      const node = handleAmazonProviderNodes(service);
      console.log(node, "el node manin");
      return node;
    }
  }
}

function handleAmazonProviderNodes(service: CreateNodeType) {
  switch (service.type) {
    // s3 buckt
    case "s3": {
      const node = {
        configuration: {
          bucket: generateName(),
        },
      };

      const validatedData = bucketSchema.safeParse(node);
      if (!validatedData.success) {
        console.log(validatedData.error, "the error");
        throw new Error("Invalid data");
      }

      return validatedData.data;
    }
    case "lambda": {
      const name = generateName();
      const node = {
        configuration: {
          name,
          function_name: `${name}_function`,
          runtime: "nodejs18.x",
        },
      };
      const validatedData = LambdaSchema.safeParse(node);
      if (!validatedData.success) {
        console.log(validatedData.error, "the error");
        throw new Error("Invalid data");
      }

      return validatedData.data;
    }
  }
}
