import { TransportMode } from "./TransportMode";

export interface IRealTimeDeparturesResponse {
    StatusCode: number;
    ExecutionTime: number;
    Message?: string;
    ResponseData: IRealTimeDeparturesResponseData;
}

export interface IRealTimeDeparturesResponseData {
    LatestUpdate: Date;
    DataAge: number;
    Buses: IRealTimeDeparture[];
    Metros: IRealTimeDeparture[];
    Trains: IRealTimeDeparture[];
    Trams: IRealTimeDeparture[];
    Ships: IRealTimeDeparture[];
    StopPointDeviations: IStopPointDeviation[];
}

export interface IRealTimeDeparture {
    TransportMode: TransportMode;
    LineNumber: string;
    Destination: string;
    JourneyDirection: number;
    GroupOfLine?: string;
    StopAreaName: string;
    StopAreaNumber: number;
    StopPointNumber: number;
    StopPointDesignation?: string;
    TimeTabledDateTime: Date;
    ExpectedDateTime: Date;
    DisplayTime: string;
    JourneyNumber: number;
    Deviations: IDeviation[];
    SecondaryDestinationName?: string;
    PredictionState: PredictionState;
}

export interface IDeviation {
    Consequence: string;
    ImportanceLevel: number;
    Text: string;
}

export interface IStopPointDeviation {
    StopInfo: IStopInfo;
    Deviation: IDeviation;
}

export interface IStopInfo {
    GroupOfLine?: string;
    StopAreaName: string;
    StopAreaNumber: number;
    TransportMode: TransportMode;
}

export enum PredictionState {
    Normal = "NORMAL",
    Unreliable = "UNRELIABLE",
    Unknown = "UNKNOWN"
}
