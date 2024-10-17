import { maxTimer, pointsTable } from "../constants/score-constants";

export const FIRST_INDICE_MALUS = 500;
export const SECOND_INDICE_MALUS = 1000;
export const SOLUTION_MALUS = 2000;

export function computeMalusFromIndice(indiceId: number): number {
    if (indiceId < 1 || indiceId > 9) {
        return 0;
    }

    const malus = (indiceId - 1) % 3;
    return malus === 0 
        ? FIRST_INDICE_MALUS 
        : malus === 1 
            ? SECOND_INDICE_MALUS 
            : SOLUTION_MALUS;
}

export function computeMalusPoints(malus : Record<number, boolean>): number {
    return Object
        .keys(malus)
        .reduce((acc, indice) =>  {
            return acc + computeMalusFromIndice(+indice)
        }, 0);
}

export function computeTimePoints(timer: number): number {
    // Vérifie si le temps est un nombre et est positif
    if (timer < 0) {
        return pointsTable[pointsTable.length - 1].points;
    }

    const timeElapsedMinutes = timer / 60;

    let points = 0;

    for (let i = 0; i < pointsTable.length; i++) {
        if (Math.floor(timeElapsedMinutes) <= parseInt(pointsTable[i].range)) {
            points = pointsTable[i].points;
            break;
        }
    }

    return points;
}

export function computeScorePoints(malus: Record<number, boolean>, timer: number): number {
    return computeTimePoints(timer) - computeMalusPoints(malus);
}