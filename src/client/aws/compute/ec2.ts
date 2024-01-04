import { z } from "zod";
import { axiosInstance } from "../../axios";

export const responseSchema = z.object({
  data: z.object({
    resourcesString: z.string(),
  }),
});

export async function getEC2(nodeData: unknown) {
  const response = await axiosInstance.post("/vms", JSON.stringify(nodeData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return responseSchema.parse(response).data;
}
