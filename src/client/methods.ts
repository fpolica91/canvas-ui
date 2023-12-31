import { ProviderConfigType } from "../types/store";

import { axiosInstance } from "./axios";
import { z } from "zod";

export const responseSchema = z.object({
  data: z.object({
    providerString: z.string(),
    variablesString: z.string(),
  }),
});

export async function getProvider(providerComfig: ProviderConfigType) {
  const response = await axiosInstance.post(
    "/createprovider",
    JSON.stringify(providerComfig),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return responseSchema.parse(response).data;
}
