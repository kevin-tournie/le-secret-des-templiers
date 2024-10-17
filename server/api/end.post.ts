import logger from "../libs/pino";
import { db } from "../database/db";
import { teams } from "../database/schema";
import { eq } from "drizzle-orm";
import { computeMalusPoints, computeScorePoints } from "../utils/score-utils";
import { formatTimer } from "../utils/time-utils";
import { maxTimer } from "../constants/score-constants";

type Payload = {
  timer: number,
  malus: Record<number, boolean>
}

export default defineEventHandler(async (event) => {
    const payload = await readBody<Payload>(event);

    const { user } = await getUserSession(event);

    const timeElapsed = maxTimer - payload.timer;

    const totalMalusPoints = computeMalusPoints(payload.malus);
    const formattedTime = formatTimer(timeElapsed);
    const score = computeScorePoints(payload.malus, timeElapsed);

    logger.info(`Team ${user?.team} finished the game | Time: ${formattedTime},  Malus : ${totalMalusPoints}, Total Points: ${score}`)

    const session = await requireUserSession(event);

    await db
      .update(teams)
      .set({
        time: timeElapsed, 
        malus_points: totalMalusPoints,
        score
      })
      .where(eq(teams.name, session.user.team))

    return new Response("ok");
  });
  