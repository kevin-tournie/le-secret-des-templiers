import { z } from "zod";

export const qcmResponses = z.object({
  response1: z.number(),
  response2: z.number(),
  response3: z.number(),
});

export type QcmResponsesForm = z.output<typeof qcmResponses>;
