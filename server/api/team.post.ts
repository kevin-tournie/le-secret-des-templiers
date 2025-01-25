import { eq, and } from "drizzle-orm";
import { createTeamSchema } from "~/composables/useCreateTeam";
import { db } from "../database/db";
import { teams } from "../database/schema";
import logger from "../libs/pino";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const result = createTeamSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.errors[0].message,
    });
  }

  const potentialTeam = await db
    .select()
    .from(teams)
    .where(and(eq(teams.name, result.data.teamName)));

  if (potentialTeam.length === 0) {
    await db.insert(teams).values({
      name: result.data.teamName,
      company: result.data.companyName,
      score: 0,
      malus_points: 0,
    });
    logger.info(`Team "${result.data.teamName}" has been created successfully`);
  } else {
    logger.info(`Team ${potentialTeam[0].name} already exists`);
    throw createError({
      statusCode: 409,
      statusMessage: "Team already exists",
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
