import logger from "../libs/pino";
import { db } from "../database/db";
import { teams } from "../database/schema";
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const session = await requireUserSession(event);

    const queryResult = await db
      .select({
        malus: teams.malus_points
      })
      .from(teams)
      .where(eq(teams.name, session.user.team))
     
    const currentMalus = queryResult[0].malus;

    await db
      .update(teams)
      .set({
        malus_points: currentMalus + body.malus
      })
      .where(eq(teams.name, session.user.team))
  });
  