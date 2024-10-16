import logger from "../libs/pino";
import { db } from "../database/db";
import { teams } from "../database/schema";
import { eq } from "drizzle-orm";
import { computeMalus } from "../utils/malus-utils";
import { formatTimer } from "../utils/time-utils";

type Payload = {
  timer: number,
  malus: Record<number, boolean>
}

export default defineEventHandler(async (event) => {
    const payload = await readBody<Payload>(event);

    const { user } = await getUserSession(event);

    const totalMalusPoints = computeMalus(payload.malus);
    const formattedTime = formatTimer(payload.timer);

    logger.info(`L'équipe ${user?.team} a terminé la partie avec un temps de ${formattedTime} et un malus de ${totalMalusPoints} points`)

    const session = await requireUserSession(event);

    await db
      .update(teams)
      .set({
        time: 3600 - payload.timer, 
        malus_points: totalMalusPoints
      })
      .where(eq(teams.name, session.user.team))

    return new Response("ok");
  });
  