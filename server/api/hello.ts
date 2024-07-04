import { eq } from "drizzle-orm";
import { db } from "../database/db"
import { teams } from "../database/schema"

export default defineEventHandler(async (event) => {

    // await db.insert(teams).values({
    //     name: 'Team 1',
    //     company: 'Company 1',
    //     start_time: '2021-10-10 10:00:00',
    //     end_time: '2021-10-10 12:00:00',
    //     score: 0,
    //     malus_points: 0
    // });

    const teamList = await db.select().from(teams).where(eq(teams.id, 1));

    return teamList
})