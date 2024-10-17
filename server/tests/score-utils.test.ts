import { describe, expect, test } from "vitest";
import { computeMalusPoints, computeTimePoints, FIRST_INDICE_MALUS, SECOND_INDICE_MALUS, SOLUTION_MALUS } from "../utils/score-utils";
import { computeMalusFromIndice } from "../utils/score-utils";
import { maxTimer } from "../constants/score-constants";

describe('computeMalusFromIndice', () => {
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
        expect(computeMalusFromIndice(3)).toBe(SOLUTION_MALUS);
        expect(computeMalusFromIndice(6)).toBe(SOLUTION_MALUS);
        expect(computeMalusFromIndice(9)).toBe(SOLUTION_MALUS);
    })
})

describe("compiteMalusPoints", () => {
    test("it should return the correct points for different malus object", () => {
        expect(computeMalusPoints({
            1: true,
            2: true,
            3: true
        })).toBe(3500);

        expect(computeMalusPoints({
            4: true,
            5: true,
            6: true
        })).toBe(3500);

        expect(computeMalusPoints({
            7: true,
            8: true,
            9: true
        })).toBe(3500);

        expect(computeMalusPoints({
            3: true,
            6: true,
            9: true
        })).toBe(6000);

        expect(computeMalusPoints({
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true
        })).toBe(10500);
    })
})

describe("computeTimePoints", () => {
    test('it should return the correct points for different timer value', () => {
        expect(computeTimePoints(maxTimer - 10*60)).toBe(15000);
        expect(computeTimePoints(maxTimer - 25*60)).toBe(13000);
        expect(computeTimePoints(maxTimer -30*60)).toBe(13000);
        expect(computeTimePoints(maxTimer -55*60)).toBe(10000);
        expect(computeTimePoints(maxTimer -157*60)).toBe(900);
        expect(computeTimePoints(maxTimer -30*60)).toBe(13000);
        expect(computeTimePoints(maxTimer -179*60)).toBe(700);
        
        expect(computeTimePoints(maxTimer - 182*60)).toBe(600);

    })
}) 