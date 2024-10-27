export type Indice = {
    id: number;
    value: string;
    flipped: boolean;
}

export type Enigme = {
    templier: string;
    indices: Indice[];
}