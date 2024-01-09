import { BucketFormFields } from "../components/Dialog/types/aws/s3";
import { ZodTypeAny, z } from "zod";
import {
  StorageBucketSchemaValidator,
  ComputeEC2SchemaValidator,
  ComputeLambdaSchemaValidator,
  NetworkVPCFormValidator,
} from "../constants/aws/";
import { EC2FormFields } from "../components/Dialog/types/vms/ec2_instance";
import { LambdaFormFields } from "../components/Dialog/types/vms/lambda";

type SchemaType = z.infer<ZodTypeAny>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldsType = Record<string, any>;

type NodeTypeConfig = {
  schema: SchemaType;
  fields: FieldsType;
};

type ProviderConfig = Record<string, NodeTypeConfig>;

const schemaMap: Record<string, ProviderConfig> = {
  aws: {
    s3: {
      schema: StorageBucketSchemaValidator,
      fields: BucketFormFields,
    },
    ec2: {
      schema: ComputeEC2SchemaValidator,
      fields: EC2FormFields,
    },
    lambda: {
      schema: ComputeLambdaSchemaValidator,
      fields: LambdaFormFields,
    },
    vpc: {
      schema: NetworkVPCFormValidator,
      fields: [],
    },
  },
};

export function getNodeFormConfiguration(provider: string, nodeType: string) {
  return schemaMap[provider][nodeType];
}
