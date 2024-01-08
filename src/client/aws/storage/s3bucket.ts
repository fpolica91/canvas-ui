import { z } from "zod";
import { axiosInstance } from "../../axios";

export const responseSchema = z.object({
  data: z.object({
    resourcesString: z.string(),
  }),
});

export async function getBuckets(nodeData: unknown) {
  const response = await axiosInstance.post(
    "/createbuckets",
    JSON.stringify(nodeData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  return responseSchema.parse(response).data;
}
