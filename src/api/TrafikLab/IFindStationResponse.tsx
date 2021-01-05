export interface IFindStationResponse {
    StatusCode: number;
    Message: string;
    ExecutionTime: number;
    ResponseData: ISite[];
}

export interface ISite {
    Name: string;
    SiteId: number;
    Type: SiteType;
    X: string;
    Y: string;
}

export enum SiteType {
    Station = "Station",
    Address = "Address",
    Poi = "Poi"
}
