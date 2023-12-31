import { z } from "zod";
import { axiosInstance } from "../../axios";
import { BucketsType } from "../../../types/aws/storage/bucket";

export const responseSchema = z.object({
  data: z.object({
    resourcesString: z.string(),
  }),
});

export async function getBuckets(nodeData: BucketsType) {
  const response = await axiosInstance.post(
    "/createbuckets",
    JSON.stringify(nodeData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return responseSchema.parse(response).data;
}
