import { eq, and } from "drizzle-orm";
import { createTeamSchema } from "~/composables/useCreateTeam";
import { db } from "../database/db";
import { teams } from "../database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const payload = JSON.parse(body);

  const result = createTeamSchema.safeParse(payload);

  if (!result.success) {
    return {
      status: 400,
      body: result.error,
    };
  }

  const potentialTeam = await db
    .select()
    .from(teams)
    .where(and(eq(teams.name, result.data.teamName)));

  // Si l'équipe n'existe pas, on la créée
  if (potentialTeam.length === 0) {
    await db.insert(teams).values({
      name: result.data.teamName,
      company: result.data.companyName,
      score: 0,
      malus_points: 0,
    });
  }

  await setUserSession(event, {
    user: {
      team: result.data.teamName,
      companyName: result.data.companyName,
    },
  });

  return result.data;
});
