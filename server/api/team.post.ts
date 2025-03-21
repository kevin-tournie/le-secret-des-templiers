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

  let existingTeam = await db
    .select({
      name: teams.name,
      company: teams.company,
      createdAt: teams.createdAt,
    })
    .from(teams)
    .where(and(eq(teams.name, result.data.teamName)));

  console.log(existingTeam);
  if (existingTeam.length === 0) {
    const newTeam = await db
      .insert(teams)
      .values({
        name: result.data.teamName,
        company: result.data.companyName,
        score: 0,
        malus_points: 0,
      })
      .returning({
        name: teams.name,
        company: teams.company,
        createdAt: teams.createdAt,
      });

    logger.info(`Team "${newTeam[0].name}" has been created successfully`);

    await setUserSession(event, {
      user: {
        team: newTeam[0].name,
        companyName: newTeam[0].company,
        createdAt: newTeam[0].createdAt,
      },
    });

    return newTeam[0];
  } else {
    logger.info(`Team '${existingTeam[0].name}' already exists`);

    await setUserSession(event, {
      user: {
        team: existingTeam[0].name,
        companyName: existingTeam[0].company,
        createdAt: existingTeam[0].createdAt,
      },
    });

    return existingTeam[0];
  }
});
