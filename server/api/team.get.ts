import { desc, eq } from "drizzle-orm";
import { db } from "../database/db";
import { teams } from "../database/schema";

type ScoreBoard = {
    companyTeams: {
        name: string,
        score: number
    }[],
    globalTeams: {
        name: string,
        score: number
    }[],
}

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event);

    const company = session.user.companyName;

    const scoreBoard: ScoreBoard = {
        "companyTeams" : [],
        "globalTeams": []
    };

    if (company) {
        scoreBoard.companyTeams = await db
        .select({
            score: teams.score,
            name: teams.name
        })
        .from(teams)
        .where(eq(teams.company, company))
        .orderBy(desc(teams.score))
        .limit(10)
    }

    scoreBoard.globalTeams = await db.
        select({
            score: teams.score,
            name: teams.name
        })
        .from(teams)
        .orderBy(desc(teams.score))
        .limit(10);

    return scoreBoard;
});