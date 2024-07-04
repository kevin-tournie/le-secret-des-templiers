import { eq } from "drizzle-orm";
import { db } from "../database/db"
import { teams } from "../database/schema"
import { createTeamSchema } from "~/composables/useCreateTeam";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const payload = JSON.parse(body);

    const result = createTeamSchema.safeParse(payload);

    if (!result.success) {
        return {
            status: 400,
            body: result.error
        }
    }

    await db.insert(teams).values({
        name: result.data.teamName,
        company: result.data.companyName,
        score: 0,
        malus_points: 0
    });

    const teamList = await db.select().from(teams).where(eq(teams.id, 1));

    return teamList
})