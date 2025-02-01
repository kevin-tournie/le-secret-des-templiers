import { z } from "zod";

export async function useCreateTeam(createTeamForm: CreateTeamForm) {
  const response = await $fetch("/api/team", {
    method: "POST",
    body: JSON.stringify(createTeamForm),
  });

  return response;
}

export const createTeamSchema = z.object({
  teamName: z.string().max(50).trim(),
  companyName: z.string().max(50).trim().optional(),
});

export type CreateTeamForm = z.output<typeof createTeamSchema>;
