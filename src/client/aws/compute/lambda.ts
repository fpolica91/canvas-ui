import { z } from "zod";
import { axiosInstance } from "../../axios";

export const responseSchema = z.object({
  data: z.object({
    resourcesString: z.string(),
  }),
});

export async function getLambda(nodeData: unknown) {
  const response = await axiosInstance.post(
    "/cloudfunction",
    JSON.stringify(nodeData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return responseSchema.parse(response).data;
}
