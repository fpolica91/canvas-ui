import { EC2Schema } from "../constants/aws/types/compute/ec2";
import { LambdaSchema } from "../constants/aws/types/compute/lambda";
import { vpcSchema } from "../constants/aws/types/network/vpc";
import { bucketSchema } from "../constants/aws/types/storage/bucket";
import { CreateNodeType } from "../context/store/types";
import { generateName } from "./nameGenerator";

export function createInitialNodeData(service: CreateNodeType, resourceName?: string) {
  switch (service.provider) {
    case "aws": {
      const node = handleAmazonProviderNodes(service, resourceName);
      return node;
    }
  }
}

function handleAmazonProviderNodes(service: CreateNodeType, resourceName?: string) {
    service.resourceName = resourceName || generateName()
  switch (service.type) {
    case "s3": {
      const node = {
        configuration: {
          bucket: service.resourceName
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
      const name = service.resourceName;
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
    case "ec2": {
      const name = service.resourceName;
      const node = {
        configuration: {
          name,
          ami: `ami-0dc2d3e4c0f9ebd18`,
          instance_type: "t2.micro",
        },
      };
      const validatedData = EC2Schema.safeParse(node);
      if (!validatedData.success) {
        console.log(validatedData.error, "the error");
        throw new Error("Invalid data");
      }

      return validatedData.data;
    }
    case "vpc": {
      const node = {
        configuration: {
          name: service.resourceName,
          cidr_block: "10.0.0.0/16",
        },
      };
      const validatedData = vpcSchema.safeParse(node);
      if (!validatedData.success) {
        console.log(validatedData.error, "the error");
        throw new Error("Invalid data");
      }
      return validatedData.data;
    }
  }
}
