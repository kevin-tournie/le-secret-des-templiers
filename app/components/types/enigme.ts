export type Indice = {
    id: number;
    value: string;
    type: string;
    flipped: boolean;
}

export type Enigme = {
    templier: string;
    indices: Indice[];
}

export type IndiceType =
  | "indice_lieu"
  | "solution_lieu"
  | "indice_enigme"
  | "solution_enigme";
