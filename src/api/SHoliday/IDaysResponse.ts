export interface IDaysResponse {
    cachetid: string,
    version: string,
    uri: string,
    startdatum: string,
    slutdatum: string,
    dagar: IDay[]
}

export interface IDay {
    datum: string,
    veckodag: string,
    "arbetsfri dag": string,
    "röd dag": string,
    vecka: string,
    "dag i vecka": string,
    helgdag: string,
    namnsdag: string[],
    flaggdag: string
}
