import { z } from "zod";

export const terraformSchema = z.object({
  providerString: z.string(),
  resourceString: z.string(),
  variableString: z.string(),
});

export type TerraformSchemaType = z.infer<typeof terraformSchema>;

export function getEditorString(
  key: "provider" | "main" | "variables",
  terraform: TerraformSchemaType
): string {
  const keyMap = {
    provider: "providerString",
    main: "resourceString",
    variables: "variableString",
  };
  const pickedKey = keyMap[key] as keyof TerraformSchemaType;

  const result = terraformSchema.pick({ [pickedKey]: true }).parse(terraform);
  return result[pickedKey];
}
