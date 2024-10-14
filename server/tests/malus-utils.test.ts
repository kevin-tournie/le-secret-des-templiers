import { describe, expect, test } from "vitest";
import { FIRST_INDICE_MALUS, SECOND_INDICE_MALUS, THIRD_INDICE_MALUS } from "../utils/malus-utils";
import { computeMalusFromIndice } from "../utils/malus-utils";

describe('malus-utils', () => {
    test('it should return FIRST_INDICE_MALUS for indice 1, 4 and 7', () => {
        expect(computeMalusFromIndice(1)).toBe(FIRST_INDICE_MALUS);
        expect(computeMalusFromIndice(4)).toBe(FIRST_INDICE_MALUS);
        expect(computeMalusFromIndice(7)).toBe(FIRST_INDICE_MALUS);
    })

    test('it should return SECOND_INDICE_MALUS for indice 2, 5 and 8', () => {
        expect(computeMalusFromIndice(2)).toBe(SECOND_INDICE_MALUS);
        expect(computeMalusFromIndice(5)).toBe(SECOND_INDICE_MALUS);
        expect(computeMalusFromIndice(8)).toBe(SECOND_INDICE_MALUS);
    })

    test('it should return THIRD_INDICE_MALUS for indice 3, 6 and 9', () => {
        expect(computeMalusFromIndice(3)).toBe(THIRD_INDICE_MALUS);
        expect(computeMalusFromIndice(6)).toBe(THIRD_INDICE_MALUS);
        expect(computeMalusFromIndice(9)).toBe(THIRD_INDICE_MALUS);
    })
})