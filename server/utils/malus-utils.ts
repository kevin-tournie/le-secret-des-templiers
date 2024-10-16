export const FIRST_INDICE_MALUS = 1;
export const SECOND_INDICE_MALUS = 2;
export const THIRD_INDICE_MALUS = 3;

export function computeMalusFromIndice(indiceId: number): number {
    if (indiceId < 1 || indiceId > 9) {
        return 0;
    }

    const malus = (indiceId - 1) % 3;
    return malus === 0 
        ? FIRST_INDICE_MALUS 
        : malus === 1 
            ? SECOND_INDICE_MALUS 
            : THIRD_INDICE_MALUS;
}

export function computeMalus(malus : Record<number, boolean>): number {
    return Object
        .keys(malus)
        .reduce((acc, indice) =>  {
            return acc + computeMalusFromIndice(+indice)
        }, 0);
}